import { Link } from 'react-router-dom'

/** The founder's reason for the journal, set large on the deep band. */
export default function MissionQuote() {
  return (
    <section className="band-deep" aria-labelledby="mission-heading">
      <div className="wrap section grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="mission-heading" className="section-title">Why the journal exists</h2>
          <p className="mt-4 text-[0.9375rem] max-w-[34ch]" style={{ color: 'var(--deep-muted)' }}>
            Founded in March 2016 to study the methods, mechanisms and theories of conflict
            resolution used by institutions, activists, academics and practitioners.
          </p>
        </div>
        <figure className="lg:col-span-8">
          <blockquote
            className="serif text-white text-[1.75rem] leading-[1.25] md:text-[2.5rem] md:leading-[1.18]"
            style={{ fontVariationSettings: "'opsz' 60", fontWeight: 450 }}
          >
            <p>
              &ldquo;It is an irony that India, the land of <em>ahimsa</em> and peace, has very few
              centres pursuing peace studies and promoting the skills of conflict resolution.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex flex-wrap items-center justify-between gap-6 mt-8">
            <span className="text-[0.9375rem]">
              <span className="font-semibold text-white">Dr. Jyoti M. Pathania</span>
              <span style={{ color: 'var(--deep-muted)' }}>, Founder and Chief Editor</span>
            </span>
            <Link to="/about" className="text-link" style={{ color: '#fff' }}>
              About the journal <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
