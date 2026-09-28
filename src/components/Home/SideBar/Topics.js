import { NavLink } from '../../utils/LinkItems'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config/config'
import { CircularLoader } from "../../Loaders";

const TOP_TOPIC_LIMIT = 10
// A mention loses half its weight every two years, so topics that show up
// often stay near the top and newer articles lift a topic above older ones.
const RECENCY_HALF_LIFE_MS = 730 * 24 * 60 * 60 * 1000

const Topics = () => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getTopics = async () => {
      try {
        const articles = await fetchArticles()
        setTopics(topTopics(articles))
      } catch (e) {
        setTopics([])
      } finally {
        setIsLoading(false)
      }
    }

    getTopics()
  }, [])

  const fetchArticles = async () => {
    const url = `${config.host}/journals`
    const res = await axios.get(url)
    return Array.isArray(res?.data) ? res.data : []
  }

  return (
    <div className="p-2 mx-1 mb-6 border rounded-lg shadow-xl md:mb-0">
      <p className="mx-2 my-4 text-3xl font-bold text-center text-gray-900">
        Explore Topics
      </p>
      <ul className="text-xl font-semibold text-center primary-color">
        {
          isLoading ?
            <CircularLoader height="h-16" width="w-16" />
            :
            <LinkItems
              links={topics}
              cname="my-2 pb-2 border-b-2 border-transparent hover:border-indigo-400"
            />
        }
      </ul>
    </div>
  )
}

function LinkItems({ links, cname = '', newTab }) {
  return (
    links.map((topic, index) => {
      const topicLink = {
        value: topic,
        url: `/tags/${topic}`,
      }
      return (
        <NavLink key={index}
          cname={cname}
          newTab={newTab}
          {...topicLink}
        />
      )
    })
  )
}

function topTopics(articles) {
  const now = Date.now()
  const byKey = new Map()

  articles.forEach((article) => {
    const postedAt = Date.parse(article?.createdAt)
    if (Number.isNaN(postedAt)) return

    const age = Math.max(0, now - postedAt)
    const weight = Math.pow(0.5, age / RECENCY_HALF_LIFE_MS)
    const seen = new Set()

    String(article.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => {
        const key = tag.toLocaleLowerCase()
        if (seen.has(key)) return
        seen.add(key)

        const topic = byKey.get(key) || {
          score: 0,
          latest: 0,
          labels: new Map(),
        }
        topic.score += weight
        topic.latest = Math.max(topic.latest, postedAt)
        topic.labels.set(tag, (topic.labels.get(tag) || 0) + 1)
        byKey.set(key, topic)
      })
  })

  return [...byKey.values()]
    .map((topic) => ({
      ...topic,
      label: mostUsedLabel(topic.labels),
    }))
    .sort((a, b) => b.score - a.score || b.latest - a.latest)
    .slice(0, TOP_TOPIC_LIMIT)
    .map((topic) => topic.label)
}

function mostUsedLabel(labels) {
  return [...labels.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )[0][0]
}

export default Topics