import { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config/config'

// Snapshot file name for an API path. Only [a-z0-9-] stay literal,
// so names stay unique on case-insensitive filesystems.
const snapshotFile = (apiPath) => {
  let p = apiPath
  try { p = decodeURIComponent(apiPath) } catch {}
  return p.replace(/^\//, '').replace(/[^a-z0-9-]/g, (c) => `_${c.codePointAt(0).toString(16)}_`) + '.json'
}

const apiUrl = (path) => (config.snapshot ? `/snapshot/${snapshotFile(path)}` : `${config.host}${path}`)

/** GET an API path; returns { data, error }. data stays null until it loads. A null path fetches nothing. */
export default function useApi(path) {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    if (path == null) return undefined
    let live = true
    setState({ data: null, error: null })
    axios
      .get(apiUrl(path))
      .then((res) => {
        // A missing snapshot file falls back to index.html, which is not data.
        if (typeof res.data !== 'object') throw new Error(`No data for ${path}`)
        if (live) setState({ data: res.data, error: null })
      })
      .catch((error) => live && setState({ data: null, error }))
    return () => {
      live = false
    }
  }, [path])

  return state
}
