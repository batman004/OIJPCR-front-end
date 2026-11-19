import { Link } from 'react-router-dom'
import logo from '../../assets/brandIcons/logo.svg'
import { urlLinks as NavLinks } from '../Navigation/Nav'
import { Podcasts, SocialMedia } from './URLs'
import FooterLinks from './FooterLinks'

const Footer = () => (
  <footer className="band-deep noprint">
    <div className="wrap pt-14 pb-10 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link to="/" className="inline-flex items-center gap-4">
            <img src={logo} alt="" className="w-14 h-14" style={{ filter: 'brightness(0) invert(1)' }} />
            <span className="serif text-3xl font-semibold text-white">OIJPCR</span>
          </Link>
          <p className="mt-6 serif text-2xl leading-snug text-white max-w-md" style={{ fontVariationSettings: "'opsz' 36" }}>
            Online Indian Journal of Peace and Conflict Resolution
          </p>
          <p className="mt-4 text-sm" style={{ color: 'var(--deep-muted)' }}>
            Published online since 2016 from Sector 37, Noida, Uttar Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <FooterLinks links={NavLinks} heading="Journal" />
          <FooterLinks links={Podcasts} heading="Podcast" newTab />
          <FooterLinks links={SocialMedia} heading="Follow" newTab />
        </div>
      </div>

      <div
        className="flex flex-col gap-2 pt-6 mt-14 text-sm sm:flex-row sm:justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.18)', color: 'var(--deep-muted)' }}
      >
        <p>&copy; 2016&ndash;{new Date().getFullYear()} Online Indian Journal of Peace and Conflict Resolution</p>
        <a className="link-draw self-start" href="mailto:editor@oijpcr.org">editor@oijpcr.org</a>
      </div>
    </div>
  </footer>
)

export default Footer
