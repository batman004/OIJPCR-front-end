import { AboutText, HeadingText, JournalParticulars } from '../components/About'
import { PageHeader } from '../components/utils'
import Podcast from '../components/Home/Podcast/Podcast'

const About = () => (
  <>
    <PageHeader title="About the journal" lede={HeadingText} />

    <div className="wrap pb-16 md:pb-24">
      <div className="grid gap-14 pt-10 border-t-2 lg:grid-cols-12 lg:gap-16" style={{ borderColor: 'var(--ink)' }}>
        <div className="lg:col-span-7">
          <div className="article-body" style={{ marginInline: 0 }}>
            <AboutText />
          </div>
        </div>
        <aside className="lg:col-span-5" aria-labelledby="particulars-heading">
          <div className="lg:sticky lg:top-28">
            <h2 id="particulars-heading" className="text-base font-semibold mb-3" style={{ fontFamily: 'var(--font-sans)', letterSpacing: 0 }}>
              Journal particulars
            </h2>
            <JournalParticulars />
          </div>
        </aside>
      </div>
    </div>

    <div className="band-alt">
      <Podcast />
    </div>
  </>
)

export default About
