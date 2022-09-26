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
    <div className="p-2 mx-1 mt-4 mb-6 border rounded-lg shadow-xl md:mb-0">
      <p className="mx-2 my-4 text-3xl font-bold text-center text-gray-900">Most Popular</p>
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
    <div className="flex flex-row flex-1 pb-2 my-2 mr-4 border-b-2 border-transparent hover:border-indigo-400">
      <div className="w-1/4 pr-2 text-5xl font-bold text-right">
        {index + 1}
      </div>
      <div className="flex-1 w-3/4">
        <p className="text-sm font-semibold text-gray-900">
          <Link to={url}> {title} </Link>
        </p>
        <p className="text-xs font-medium text-gray-500">{`${textClip(authorText, 75)} Vol ${volume}`}</p>
      </div>
    </div>
  )
}

export default Popular