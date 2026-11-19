import useApi from '../utils/useApi'
import FrontPage from '../components/Home/FrontPage'
import LatestArticles from '../components/Home/LatestArticles'
import MissionQuote from '../components/Home/MissionQuote'
import TopicIndex from '../components/Home/TopicIndex'
import ArchiveStrip from '../components/Home/ArchiveStrip'
import Podcast from '../components/Home/Podcast/Podcast'
import SubmitArticleFormFullWidth from './Archive/SubmitArticleFormFullWidth'

const Home = () => {
  const articles = useApi('/journals/home/5')
  const topics = useApi('/journals/tags')
  const volumes = useApi('/journals/archive')

  const [lead, ...rest] = articles.data || []

  return (
    <>
      <FrontPage lead={lead} error={articles.error} />
      {!articles.error && <LatestArticles articles={articles.data ? rest : null} />}
      <MissionQuote />
      <TopicIndex topics={topics.data} error={topics.error} />
      <ArchiveStrip volumes={volumes.data} />
      <SubmitArticleFormFullWidth />
      <div className="band-alt">
        <Podcast />
      </div>
    </>
  )
}

export default Home
