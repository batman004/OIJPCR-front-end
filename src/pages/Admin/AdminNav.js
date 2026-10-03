import { Link } from 'react-router-dom'
import React from 'react'

export const urlLinks = [
  { url: '/admin', value: 'Dashboard' },
  { url: '/admin/new', value: 'New Article' },
  { url: '/admin/new/volume', value: 'New Volume' },
  { url: '/admin/list/volume', value: 'All Volumes' },
  { url: '/admin/list', value: 'All Articles' },
]

const AdminNav = (props) => {
  return (
    <div className="w-full bg-black">
      <div className="flex flex-row flex-wrap justify-evenly text-black text-lg">
        <LinkItems links={urlLinks}/>
        <UserMenu
          {...props}
        />
      </div>
    </div>
  )
}

function LinkItems ({ links }) {
  const styles = {
    padding: 'lg:p-4 py-3 px-0',
    border: 'border-b-4 border-transparent hover:border-gray-50 ',
    font: 'font-semibold text-xl text-gray-50 ',
    display: 'block cursor-pointer',
  }

  let cname = ''
  for (let style in styles) {
    cname = cname + styles[style] + ' '
  }

  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} cname={cname}/>
    })
  )
}

function NavLink ({ url, value, cname = '' }) {
  return (
    <Link className={cname} to={url}>
      {value}
    </Link>
  )
}

function UserMenu (props) {
  return (
    <>
      {props.token &&
      <div className="flex items-center mt-2 space-x-4">
        {props.username && <UserBadge username={props.username}/>}
        <button
          className="rounded-lg bg-purple-700 text-lg md:text-2xl font-mono
           tracking-wide text-white px-4 py-2 w-24 md:w-32 md:h-12"
          onClick={props.Logout}
        >
          Logout
        </button>
      </div>
      }
    </>
  )
}

function UserBadge ({ username }) {
  return (
    <div
      className="flex items-center min-w-0 text-gray-50"
      title={`Signed in as ${username}`}
    >
      <span
        className="flex items-center justify-center flex-shrink-0 w-9 h-9 mr-2 text-lg font-bold text-white uppercase rounded-full bg-oijpcr-blue"
        aria-hidden="true"
      >
        {username.charAt(0)}
      </span>
      <span className="leading-tight">
        <span className="block text-xs tracking-wide text-gray-400 uppercase">Signed in as</span>
        <span className="block font-semibold truncate max-w-xs">{username}</span>
      </span>
    </div>
  )
}

export default AdminNav