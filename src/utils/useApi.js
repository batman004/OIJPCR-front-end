import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config/config'

/** GET `${config.host}${path}`; returns { data, error }. data stays null until it loads. */
export default function useApi(path) {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    let live = true
    setState({ data: null, error: null })
    axios
      .get(`${config.host}${path}`)
      .then((res) => live && setState({ data: res.data, error: null }))
      .catch((error) => live && setState({ data: null, error }))
    return () => {
      live = false
    }
  }, [path])

  return state
}
