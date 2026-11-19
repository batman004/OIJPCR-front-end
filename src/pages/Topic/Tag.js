import { useParams } from 'react-router-dom'
import useApi from '../../utils/useApi'
import ArticleList from '../Archive/ArticleList'
import { PageHeader } from '../../components/utils'

const Tag = () => {
  const { tag } = useParams()
  const { data: journals, error } = useApi(`/journals/tags/${tag}`)
  const count = journals?.length

  return (
    <>
      <PageHeader
        meta="Topic"
        title={tag.trim()}
        lede={count ? `${count} ${count === 1 ? 'article' : 'articles'} on this topic.` : undefined}
      />
      <section className="wrap pb-16 md:pb-24" aria-labelledby="tag-articles">
        <h2 id="tag-articles" className="sr-only">Articles</h2>
        <div className="border-t-2" style={{ borderColor: 'var(--ink)' }}>
          <ArticleList journals={journals} error={error} />
        </div>
      </section>
    </>
  )
}

export default Tag
