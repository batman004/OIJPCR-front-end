import { useEffect, useState } from 'react'
import logo from '../../assets/brandIcons/logo.svg'
import logo_mobile from '../../assets/brandIcons/logo_mobile.svg'
import { Link, withRouter } from 'react-router-dom'

export const urlLinks = [
  { url: '/', value: 'Home' },
  { url: '/about', value: 'About' },
  { url: '/archive', value: 'Archive' },
  { url: '/submitArticle', value: 'Submit Article' },
]


const Nav = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    props.history.listen(() => setIsNavOpen(!isNavOpen))
    console.log("I just ran!")
  })

  const handleMenuClick = () => {
    setIsNavOpen(prevState => !prevState)
  }


  return (
    <Header cname="header-nav noprint">
      <Brand logo={logo} logo_mobile={logo_mobile} brandName="OIJPCR" />
      <MenuToggle MenuClick={handleMenuClick} />
      <NavMenu cname={`lg:flex lg:items-center lg:w-auto w-full ${isNavOpen ? '' : 'hidden'}`}>
        <NavLinks navItems={urlLinks} />
      </NavMenu>
    </Header>
  )
}


function Header(props) {
  return (
    <header className={props.cname}>
      {props.children}
    </header>
  )
}

// id="menu"
function NavMenu(props) {
  return (
    <div className={props.cname}>
      {props.children}
    </div>
  )
}

function NavLinks({ navItems }) {
  return (
    <nav>
      <ul className="nav-link-ul">
        {
          navItems.map((item, index) => {
            return <NavLink key={index} {...item} />
          })
        }
      </ul>
    </nav>
  )
}

function NavLink({ url, value }) {
  return (
    <li className="list-none">
      <Link
        className="text-black no-underline nav-link"
        to={url}
      >
        {value}
      </Link>
    </li>
  )
}

function MenuToggle({ MenuClick }) {
  const svg = {
    path: 'M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z',
    xmlns: 'http://www.w3.org/2000/svg',
    height: 30,
    width: 30,
    viewBox: '0 0 20 20',
  }

  return (
    <label
      htmlFor="menu-toggle"
      className="block cursor-pointer lg:hidden"
    >
      <svg className="text-gray-900 fill-current "
        xmlns={svg.xmlns}
        width={svg.width}
        height={svg.height}
        viewBox={svg.viewBox}
      >
        <title>menu</title>
        <path d={svg.path} />
      </svg>
      <input className="hidden" type="button" id="menu-toggle" onClick={MenuClick} />
    </label>
  )
}

function Brand({ logo, logo_mobile, brandName }) {
  const BrandProps = {
    altText: `${brandName} logo`,
    brandLogoCN: 'sm:w-14 sm:h-14 w-16 h-16 mr-2',
  }
  return (
    <div className="flex items-center justify-between flex-1 md:mt-2">
      <Link to="/">
        <BrandLogo {...BrandProps} logo={logo} hidden={true} />
        <BrandLogo {...BrandProps} logo={logo_mobile} hidden={false} />
        <label className="text-lg font-black sm:hidden">{brandName}</label>
      </Link>
    </div>
  )
}

function BrandLogo(props) {
  const { brandLogoCN, logo, altText, hidden } = props
  let cname = brandLogoCN
  cname += hidden ? ' hidden sm:inline' : ' inline sm:hidden'
  return (
    <img className={cname} src={logo} alt={altText} />
  )
}

export default withRouter(Nav)