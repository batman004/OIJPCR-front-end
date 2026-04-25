import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArticleList from '../Archive/ArticleList'
import config from '../../config/config'
import { useParams, useRouteMatch } from 'react-router-dom'


const Tag = () => {
  const [journals, setJournals] = useState([])
  const { tag } = useParams()
  const { path, url } = useRouteMatch()

  useEffect(() => {
    async function getJournals(tag) {
      const url = `${config.host}/journals/tags/${tag}`
      const { data: journals } = await axios.get(url)
      setJournals(journals)
    }
    return getJournals(tag)
  }, [tag])

  return (
    <div className="flex-grow">
      <div className="px-4 py-6 mx-4 md:mx-12 my-6">
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}
        >Topic</p>
        <h1
          className="text-3xl md:text-5xl font-serif font-bold pb-3"
          style={{
            color: 'var(--color-primary)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >{tag}</h1>
      </div>
      <div>
        <ArticleList
          journals={journals}
          path={path}
          url={url}
        />
      </div>
    </div>
  )
}


export default Tag