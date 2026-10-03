import config from '../config/config'

export const JOURNAL_NAME = 'Online Indian Journal of Peace and Conflict Resolution'
export const FIRST_VOLUME_YEAR = 2016
export const DEFAULT_ISSUE = 1
export const MIN_ARTICLES_PER_ISSUE = 10
// Set once the ISSN is issued; it is then added to citations and citation meta tags.
export const JOURNAL_ISSN = ''

const YEAR_PATTERN = /\b(19|20)\d{2}\b/

// Mirrors the backend's toJSON transform so labels stay correct for data from any source.
export function resolveVolumeInfo(volume, doc = {}) {
    const volumeNumber = parseInt(volume, 10)

    const explicitYear = parseInt(doc?.year, 10)
    const yearInDate = YEAR_PATTERN.exec(doc?.date || '')
    let year = FIRST_VOLUME_YEAR + (volumeNumber - 1)
    if (!isNaN(explicitYear)) year = explicitYear
    else if (yearInDate) year = parseInt(yearInDate[0], 10)

    const explicitIssue = parseInt(doc?.issue, 10)
    const issue = isNaN(explicitIssue) || explicitIssue < 1 ? DEFAULT_ISSUE : explicitIssue

    return {volume: volumeNumber, issue, year}
}

export const formatVolumeIssue = ({volume, issue, year}) =>
    `Volume ${volume}, Issue ${issue}, ${year}`

export const formatVolumeIssueShort = ({volume, issue, year}) =>
    `Vol. ${volume} \u00b7 Issue ${issue} \u00b7 ${year}`

export function formatCitation({author, title, info, url}) {
    const {volume, issue, year} = info
    const authorText = (author || '').trim().replace(/\.$/, '')
    const lead = authorText ? `${authorText}. ` : ''
    const link = url ? ` ${url}` : ''
    const issn = JOURNAL_ISSN ? ` ISSN ${JOURNAL_ISSN}.` : ''
    return `${lead}(${year}). ${(title || '').trim()}. ${JOURNAL_NAME}, ${volume}(${issue}).${issn}${link}`
}

const MEDIA_HOSTS = [
    config.s3Host,
    'media.oijpcr.org',
    'media-oijpcr.s3.ap-south-1.amazonaws.com',
]

// PDFs live in the media bucket; the site serves them from its own /pdf/* path instead.
export function sitePdfUrl(link, {absolute = false} = {}) {
    if (!link || typeof link !== 'string') return link
    try {
        const parsed = new URL(link)
        const isMediaPdf =
            MEDIA_HOSTS.includes(parsed.hostname) && /\.pdf$/i.test(parsed.pathname)
        if (!isMediaPdf) return link

        const path = `/pdf${parsed.pathname}`
        return absolute ? `${config.protocol}://${config.domain}${path}` : path
    } catch (e) {
        return link
    }
}
