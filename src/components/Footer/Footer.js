import logo from '../../assets/brandIcons/logo.svg'
import { urlLinks as NavLinks } from '../Navigation/Nav'
import {
  Podcasts,
  SocialMedia
} from "./URLs";
import { FooterContainer, FooterNavContainer } from './FooterContainers'
import FooterLinks from './FooterLinks'


const Footer = () => (
  <FooterContainer>
    <CopyrightLeftPanel logo={logo} />
    <FooterNavContainer>
      <FooterLinks links={NavLinks} heading={'Navigate'} />
      <FooterLinks links={Podcasts} heading={'Podcast'} newTab={true} />
      <FooterLinks links={SocialMedia} heading={'Social Media'} newTab={true} />
    </FooterNavContainer>
  </FooterContainer>
)


function CopyrightLeftPanel({ logo }) {
  return (
    <div className="flex-1 w-full py-2 md:pr-6 md:w-1/2 md:p-2 noprint">
      <img
        src={logo}
        alt="OIJPCR logo"
        className="w-14 h-14 md:w-16 md:h-16 mb-3"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
      <p className="mt-2 md:mt-4 text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '0.02em' }}>
        Online Indian Journal of Peace and Conflict Resolution
      </p>
      <p className='mt-1 opacity-80'>Sector-37, Noida, UP, India &mdash; 201303</p>
      <p className='mt-3 opacity-70 text-xs'>&copy; Copyright 2016&ndash;2025</p>
    </div>
  )
}


export default Footer;
