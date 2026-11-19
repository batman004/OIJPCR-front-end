import { Link } from 'react-router-dom'
import { PageHeader } from '../components/utils'
import Podcast from '../components/Home/Podcast/Podcast'

const Contact = () => (
  <>
    <PageHeader title="Contact" lede="Write to the editor about submissions, reviews or the journal itself." />

    <div className="wrap pb-16 md:pb-24">
      <div className="grid gap-12 pt-10 border-t-2 lg:grid-cols-12" style={{ borderColor: 'var(--ink)' }}>
        <section className="lg:col-span-7" aria-labelledby="editor-heading">
          <h2 id="editor-heading" className="meta">Write to the editor</h2>
          <a
            href="mailto:editor@oijpcr.org"
            className="inline-block mt-3 serif font-medium link-draw break-all"
            style={{ fontSize: 'clamp(1.9rem, 1.2rem + 3vw, 3.5rem)', lineHeight: 1.1, fontVariationSettings: "'opsz' 72" }}
          >
            editor@oijpcr.org
          </a>
          <p className="summary mt-6">
            <strong>Dr. Jyoti M. Pathania</strong>, Founder and Chief Editor
          </p>
          <p className="summary mt-6 max-w-[52ch]">
            Sending a manuscript? Use the{' '}
            <Link to="/submitArticle" className="text-link">submission form</Link>{' '}
            so it reaches the editors with everything they need.
          </p>
        </section>

        <section className="lg:col-span-5" aria-labelledby="address-heading">
          <h2 id="address-heading" className="text-base font-semibold mb-3" style={{ fontFamily: 'var(--font-sans)', letterSpacing: 0 }}>
            Mailing address
          </h2>
          <dl className="facts">
            <div>
              <dt>Address</dt>
              <dd>Sector-37, Noida 201301, Uttar Pradesh, India</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a className="link-draw" href="tel:+917042660900">+91 70426 60900</a></dd>
            </div>
          </dl>
        </section>
      </div>
    </div>

    <div className="band-alt">
      <Podcast />
    </div>
  </>
)

export default Contact
