import { Redirect, Route, Switch } from 'react-router-dom'
import useApi from '../../utils/useApi'
import Volume from './Volume'
import { VolumeCard } from '../../components/Cards'
import { PageHeader } from '../../components/utils'
import ReadArticle from '../Articles/ReadArticle'
import SubmitArticleFormFullWidth from './SubmitArticleFormFullWidth'

const Archive = () => {
  const { data: archives, error } = useApi('/journals/archive')

  return (
    <Switch>
      <Route exact path="/archive" render={() => <ArchiveIndex archives={archives} error={error} />} />

      <Route
        exact
        path="/archive/:volume"
        render={({ match }) => {
          const volume = match.params.volume
          const info = archives?.find((entry) => String(entry.volume) === String(volume))
          return <Volume volume={volume} info={info} />
        }}
      />

      <Route
        exact
        path="/archive/:urlSlug/:id"
        render={({ match }) => <ReadArticle urlSlug={match.params.urlSlug} id={match.params.id} />}
      />

      <Route path="/archive/*" render={() => <Redirect to="/notFound" />} />
    </Switch>
  )
}

function ArchiveIndex({ archives, error }) {
  const volumes = archives ? [...archives].sort((a, b) => b.volume - a.volume) : null

  return (
    <>
      <PageHeader
        title="The archive"
        lede="Every volume of the journal since 2016, newest first. Each volume opens with an editor's note."
      />
      <section className="wrap pb-16 md:pb-24" aria-labelledby="volumes-heading">
        <h2 id="volumes-heading" className="sr-only">Volumes</h2>
        <div className="border-t-2" style={{ borderColor: 'var(--ink)' }}>
          {error && <p className="summary py-8">The archive could not be loaded. Please try again shortly.</p>}
          {!error && !volumes && [1, 2, 3].map((i) => <VolumeSkeleton key={i} />)}
          {volumes && volumes.map((volume) => <VolumeCard key={volume.volume} {...volume} />)}
        </div>
      </section>
      <SubmitArticleFormFullWidth />
    </>
  )
}

function VolumeSkeleton() {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 py-8 border-b md:grid-cols-[7rem_minmax(0,1fr)_14rem] md:gap-x-10" style={{ borderColor: 'var(--hair)' }} aria-hidden="true">
      <div className="skeleton w-20 h-16" />
      <div>
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-7 w-48 mt-3" />
        <div className="skeleton h-4 w-full mt-4" />
        <div className="skeleton h-4 w-2/3 mt-2" />
      </div>
      <div className="hidden md:block skeleton ratio-4-3" />
    </div>
  )
}

export default Archive
