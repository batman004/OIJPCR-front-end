import {useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import config from '../config/config'
import {resolveVolumeInfo} from './bibliography'

let archiveRequest = null

function loadArchive() {
    if (!archiveRequest) {
        archiveRequest = axios
            .get(`${config.host}/journals/archive`)
            .then(({data}) => (Array.isArray(data) ? data : []))
            .catch(() => {
                archiveRequest = null
                return []
            })
    }
    return archiveRequest
}

export default function useVolumeInfo(volume) {
    const [archive, setArchive] = useState([])

    useEffect(() => {
        let active = true
        loadArchive().then(volumes => active && setArchive(volumes))
        return () => {
            active = false
        }
    }, [])

    return useMemo(() => {
        const doc = archive.find(entry => entry.volume === parseInt(volume, 10))
        return resolveVolumeInfo(volume, doc)
    }, [archive, volume])
}
