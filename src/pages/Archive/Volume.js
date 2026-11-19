import useApi from '../../utils/useApi'
import ArticleList from './ArticleList'

/** One volume: its numeral, the editor's note, then every article in it. */
const Volume = ({ volume, info }) => {
  const { data: journals, error } = useApi(`/journals/all/${volume}/info`)

  return (
    <>
      <header className="wrap pt-12 md:pt-16 pb-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <p
            className="md:col-span-4 serif font-medium leading-[0.8] rise"
            style={{ fontSize: 'clamp(6rem, 4rem + 9vw, 12rem)', fontVariationSettings: "'opsz' 72", fontFeatureSettings: "'lnum'", color: 'var(--accent)' }}
            aria-hidden="true"
          >
            {String(volume).padStart(2, '0')}
          </p>
          <div className="md:col-span-8">
            {info?.date && <p className="meta rise">{info.date}</p>}
            <h1 className="page-title mt-2 rise">Volume {volume}</h1>
            {info?.about && (
              <div className="mt-8 pt-5 border-t rise rise-2" style={{ borderColor: 'var(--hair)' }}>
                <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-sans)', letterSpacing: 0 }}>
                  Editor&rsquo;s note
                </h2>
                <p className="summary text-lg mt-3 max-w-[50ch]">{info.about}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="wrap pb-16 md:pb-24" aria-labelledby="volume-articles">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <h2 id="volume-articles" className="section-title">In this volume</h2>
          {journals && <p className="meta">{journals.length} {journals.length === 1 ? 'article' : 'articles'}</p>}
        </div>
        <ArticleList journals={journals} error={error} showVolume={false} />
      </section>
    </>
  )
}

export default Volume
