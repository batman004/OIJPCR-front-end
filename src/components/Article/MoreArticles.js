import { ArticleCardSmall } from '../Cards'

/** Other articles from the same volume, excluding the one being read. */
const MoreArticles = ({ articles, currentId, isLoading }) => {
  const others = (articles || []).filter((article) => article._id !== currentId).slice(0, 3)

  if (isLoading && others.length === 0) {
    return (
      <div className="grid gap-8 md:grid-cols-3" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="skeleton ratio-3-2" />
            <div className="skeleton h-3 w-32 mt-4" />
            <div className="skeleton h-6 mt-3 w-11/12" />
          </div>
        ))}
      </div>
    )
  }

  if (others.length === 0) {
    return <p className="summary">No other articles from this volume yet.</p>
  }

  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-8">
      {others.map((article) => (
        <ArticleCardSmall
          key={article._id}
          {...article}
          id={article._id}
          coverPhoto={article.cover}
        />
      ))}
    </div>
  )
}

export default MoreArticles
