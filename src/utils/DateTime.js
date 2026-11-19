const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

/** "2026-10-31T14:15:49.290Z" -> "31 October 2026"; '' for missing or invalid input. */
export default function formatDate(iso) {
    if (!iso) return ''
    const date = new Date(iso)
    return Number.isNaN(date.getTime()) ? '' : formatter.format(date)
}
