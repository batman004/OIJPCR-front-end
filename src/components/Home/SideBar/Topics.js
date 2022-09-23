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
    <div className="p-2 mx-1 mb-6 border rounded-lg shadow-xl md:mb-0">
      <p className="mx-2 my-4 text-3xl font-bold text-center text-gray-900">
        Explore Topics
      </p>
      <ul className="text-xl font-semibold text-center primary-color">
        {
          topics.length === 0 ?
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

export default Topics