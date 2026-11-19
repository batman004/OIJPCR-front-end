import { Link } from 'react-router-dom'

/** Call for submissions, shown at the foot of the front page, archive and articles. */
function SubmitArticleFormFullWidth() {
  return (
    <section className="wrap pb-16 md:pb-24 noprint" aria-labelledby="cfp-heading">
      <div className="grid gap-8 py-10 md:py-14 border-t-2 border-b md:grid-cols-12 md:items-end" style={{ borderTopColor: 'var(--ink)', borderBottomColor: 'var(--hair)' }}>
        <div className="md:col-span-8">
          <p className="meta" style={{ color: 'var(--accent)' }}>Call for submissions</p>
          <h2 id="cfp-heading" className="section-title mt-3 max-w-[22ch]" style={{ fontSize: 'clamp(1.75rem, 1.3rem + 1.6vw, 2.6rem)' }}>
            Interested in seeing your article in this space?
          </h2>
          <p className="summary mt-4 max-w-[56ch]">
            We publish research articles, commentary and book reviews on peace and conflict
            resolution, with specific reference to India. Send a draft and the editors will write back.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-4 md:justify-end">
          <Link to="/submitArticle" className="btn">Submit an article</Link>
        </div>
      </div>
    </section>
  )
}

export default SubmitArticleFormFullWidth
