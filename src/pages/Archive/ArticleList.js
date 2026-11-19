import { ArticleCard } from '../../components/Cards'
import { LoadingCard } from '../../components/Loaders'

/** Ruled list of articles for a volume or a topic. `journals` is null while loading. */
const ArticleList = ({ journals, error, showVolume }) => {
  if (error) return <p className="summary py-8">These articles could not be loaded. Please try again shortly.</p>
  if (!journals) return [1, 2, 3].map((i) => <LoadingCard key={i} />)
  if (journals.length === 0) return <p className="summary py-8">No articles found.</p>

  return journals.map((article) => (
    <ArticleCard key={article._id} {...article} id={article._id} coverPhoto={article.cover} showVolume={showVolume} />
  ))
}

export default ArticleList
