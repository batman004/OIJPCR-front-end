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
    <div className="flex-1 w-full py-2 pl-4 pr-2 md:w-1/2 md:p-2 noprint">
      <img src={logo} alt="OIJPCR logo" className="w-14 h-14 md:w-20 md:h-20" />
      <p className="mt-2 md:mt-6">&copy; Copyright 2016-2022</p>
      <p className='mb-4'>Online Indian Journal of Peace and Conflict Resolution</p>
      <p>Developed and Maintained by
        <a href='https://kabirsingh.super.site' className='underline text-gray-50 hover:cursor-pointer'> Kabir Singh Shekhawat</a> and
        <a href="https://yuvraj.super.site" className='underline text-gray-50 hover:cursor-pointer'> Yuvraj Singh Pathania</a>
      </p>
    </div>
  )
}


export default Footer;
