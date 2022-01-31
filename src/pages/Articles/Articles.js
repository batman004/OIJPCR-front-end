import ArticleCard from '../../components/Cards/ArticleCard'
import { CircularLoader } from '../../components/utils/Loaders'

export default function AllArticles({ journals }) {
  const journalList = createArticles(journals)
  return (
    <div className="h-full mx-4 md:mx-16">
      <div className="flex flex-col flex-wrap items-center w-full h-full py-2 my-4 md:flex-row justify-evenly editor">
        {journalList}
      </div>
    </div>
  )
}

function createArticles(journals) {
  if (!journals) return <CircularLoader />
  if (journals.length === 0) return 'No articles found'

  return journals.map((article) => {
    const articleProps = { id: article._id, coverPhoto: article.cover, ...article }
    return <ArticleCard {...articleProps} key={article._id} />
  })
}