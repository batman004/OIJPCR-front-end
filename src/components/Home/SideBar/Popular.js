import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularLoader } from "../../Loaders";
import config from '../../../config/config'
import slugify from 'slugify'
import { textClip } from '../../../utils';


const Popular = () => {
  const [mostPopular, setPopular] = useState([])

  useEffect(() => {
    const getPopular = async () => {
      const data = await fetchPopular()
      setPopular(data)
    }

    getPopular()
  }, [])

  const fetchPopular = async () => {
    const url = `${config.host}/journals/home/5`
    const res = await axios.get(url)
    return res?.data

  }

  return (
    <div className="p-4 mx-1 mt-6 mb-6 md:mb-0 card-surface">
      <h2
        className="mx-2 mt-2 mb-4 text-base font-bold font-serif text-center pb-2 uppercase"
        style={{
          color: 'var(--color-primary)',
          borderBottom: '1px solid var(--color-border)',
          letterSpacing: '0.06em',
        }}
      >Most Popular</h2>
      <div className="flex flex-col justify-center">
        {
          mostPopular.length === 0 ?
            <CircularLoader height="h-16" width="w-16" />
            :
            <LinkItems links={mostPopular} />
        }
      </div>
    </div>
  )
}

function LinkItems({ links }) {
  return (
    links.map((item, index) => {
      return <NavLink key={index} {...item} index={index} />
    })
  )
}

function NavLink(props) {
  const {
    author,
    volume,
    title,
    index,
    _id: id,
  } = props
  const urlSlug = slugify(title)

  const url = `/archive/${urlSlug}/${id}`
  const authorText = `By ${author} ${String.fromCharCode(183)}`
  return (
    <div
      className="popular-row flex flex-row flex-1 pb-3 my-2 mr-4 transition-colors duration-150"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div
        className="w-1/4 pr-3 text-5xl font-serif font-bold text-right"
        style={{ color: 'var(--color-accent)', opacity: 0.7 }}
      >
        {index + 1}
      </div>
      <div className="flex-1 w-3/4">
        <p
          className="text-sm font-serif font-bold leading-snug"
          style={{ color: 'var(--color-primary)' }}
        >
          <Link to={url}> {title} </Link>
        </p>
        <p
          className="text-xs font-medium mt-1 tracking-wide uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >{`${textClip(authorText, 75)} Vol ${volume}`}</p>
      </div>
    </div>
  )
}

export default Popular