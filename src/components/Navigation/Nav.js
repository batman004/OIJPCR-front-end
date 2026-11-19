import {useEffect, useState} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'
import logo from '../../assets/brandIcons/logo.svg'

export const urlLinks = [
    {url: '/', value: 'Home'},
    {url: '/about', value: 'About'},
    {url: '/editorialBoard', value: 'Editorial Board'},
    {url: '/archive', value: 'Archive'},
    {url: '/submitArticle', value: 'Submit an Article'},
    {url: '/contact', value: 'Contact'},
]

// The wordmark already leads home, and "Submit" gets its own button.
const sectionLinks = urlLinks.filter(({url}) => url !== '/' && url !== '/submitArticle')

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => setIsOpen(false), [pathname])

    return (
        <header className="masthead noprint">
            <div className="wrap flex items-center justify-between gap-6 h-16 md:h-20">
                <Brand/>

                <nav aria-label="Main" className="masthead-nav hidden lg:flex items-center gap-8">
                    {sectionLinks.map(({url, value}) => (
                        <NavLink key={url} to={url} activeClassName="is-active">
                            {value}
                        </NavLink>
                    ))}
                    <Link to="/submitArticle" className="btn" style={{minHeight: 40, padding: '8px 16px'}}>
                        Submit an article
                    </Link>
                </nav>

                <button
                    type="button"
                    className="lg:hidden inline-flex items-center gap-2 h-11 px-3 -mr-3 font-semibold text-sm"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? 'Close' : 'Menu'}
                    <MenuIcon open={isOpen}/>
                </button>
            </div>

            <nav
                id="mobile-menu"
                aria-label="Main"
                className={`lg:hidden border-t ${isOpen ? 'block' : 'hidden'}`}
                style={{borderColor: 'var(--hair)'}}
            >
                <ul className="wrap py-4">
                    {urlLinks.map(({url, value}) => (
                        <li key={url} className="border-b last:border-b-0" style={{borderColor: 'var(--hair)'}}>
                            <NavLink
                                exact={url === '/'}
                                to={url}
                                className="block py-3 serif text-2xl"
                                activeStyle={{color: 'var(--accent)'}}
                            >
                                {value}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

function Brand() {
    return (
        <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="OIJPCR home">
            <img
                src={logo}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
                style={{filter: 'brightness(0)'}}
            />
            <span className="flex flex-col min-w-0">
                <span className="serif font-semibold text-2xl md:text-[1.75rem] leading-none" style={{letterSpacing: '0.01em'}}>
                    OIJPCR
                </span>
                <span className="hidden sm:block meta mt-1 truncate">
                    Online Indian Journal of Peace and Conflict Resolution
                </span>
            </span>
        </Link>
    )
}

function MenuIcon({open}) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
            {open
                ? <path d="M4 4l12 12M16 4L4 16"/>
                : <path d="M2 6h16M2 14h16"/>}
        </svg>
    )
}

export default Nav
