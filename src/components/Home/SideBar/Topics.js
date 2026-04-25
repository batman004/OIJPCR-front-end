import { NavLink } from '../../utils/LinkItems'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config/config'
import { CircularLoader } from "../../Loaders";

const Topics = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const getTopics = async () => {
      const topics = await fetchTopics()
      setTopics(topics)
    }

    getTopics()
  }, [])

  const fetchTopics = async () => {
    const url = `${config.host}/journals/tags`
    const res = await axios.get(url)
    return res?.data
  }

  return (
    <div
      className="p-4 mx-1 mb-6 md:mb-0 card-surface"
    >
      <h2
        className="mx-2 mt-2 mb-4 text-base font-bold font-serif text-center pb-2 tracking-wider uppercase"
        style={{
          color: 'var(--color-primary)',
          borderBottom: '1px solid var(--color-border)',
          letterSpacing: '0.06em',
        }}
      >
        Explore Topics
      </h2>
      <ul className="text-sm font-medium text-center list-none p-0">
        {
          topics.length === 0 ?
            <CircularLoader height="h-16" width="w-16" />
            :
            <LinkItems
              links={topics}
              cname="topic-link my-1.5 py-1 transition-colors duration-150"
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

export default Topics