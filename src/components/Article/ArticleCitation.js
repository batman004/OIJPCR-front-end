import {useEffect} from 'react'
import {
    JOURNAL_ISSN,
    JOURNAL_NAME,
    formatCitation,
    sitePdfUrl,
    useVolumeInfo,
} from '../../utils'

const META_ATTRIBUTE = 'data-citation-meta'

function setCitationMeta(entries) {
    const created = entries
        .filter(([, content]) => content)
        .map(([name, content]) => {
            const meta = document.createElement('meta')
            meta.setAttribute('name', name)
            meta.setAttribute('content', content)
            meta.setAttribute(META_ATTRIBUTE, 'true')
            document.head.appendChild(meta)
            return meta
        })

    return () => created.forEach(meta => meta.remove())
}

const ArticleCitation = ({article, publishMeta = true}) => {
    const info = useVolumeInfo(article?.volume)
    const pageUrl = typeof window === 'undefined' ? '' : window.location.href
    const hasArticle = Boolean(article && article.title)

    useEffect(() => {
        if (!publishMeta || !hasArticle) return undefined

        return setCitationMeta([
            ['citation_title', article.title.trim()],
            ['citation_author', (article.author || '').trim()],
            ['citation_journal_title', JOURNAL_NAME],
            ['citation_issn', JOURNAL_ISSN],
            ['citation_publication_date', String(info.year)],
            ['citation_volume', String(info.volume)],
            ['citation_issue', String(info.issue)],
            ['citation_language', 'en'],
            ['citation_abstract_html_url', pageUrl],
            ['citation_pdf_url', sitePdfUrl(article.pdf, {absolute: true})],
        ])
    }, [publishMeta, hasArticle, article, info, pageUrl])

    if (!hasArticle) return null

    const citation = formatCitation({
        author: article.author,
        title: article.title,
        info,
        url: publishMeta ? pageUrl : '',
    })

    return (
        <div className="my-6 text-sm text-gray-700 lg:mx-4">
            <h3 className="mb-1 font-semibold text-gray-900">How to cite</h3>
            <p className="break-words">{citation}</p>
        </div>
    )
}

export default ArticleCitation
