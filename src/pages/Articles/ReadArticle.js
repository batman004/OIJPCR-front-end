import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import config from '../../config/config'
import { ArticleHeader, MoreArticles, ReadingProgress, ShareArticleOnSocialMedia } from '../../components/Article'
import { PDFButton, PrintButton } from '../../components/utils'
import { LoadingCardFullWidth } from '../../components/Loaders'
import { cleanTitle, tagList } from '../../utils'
import SubmitArticleFormFullWidth from '../Archive/SubmitArticleFormFullWidth'

const ReadArticle = ({ urlSlug, id }) => {
    const [article, setArticle] = useState(null)
    const [error, setError] = useState(null)
    const [moreArticles, setMoreArticles] = useState(null)
    const bodyRef = useRef(null)

    // Same route for every article, so refetch whenever the id in the URL changes.
    useEffect(() => {
        let live = true
        setArticle(null)
        setError(null)
        window.scrollTo(0, 0)
        axios
            .get(`${config.host}/journals/${urlSlug}/${id}`)
            .then(({ data }) => live && setArticle(data))
            .catch((err) => live && setError(err))
        return () => {
            live = false
        }
    }, [urlSlug, id])

    const volume = article?.volume
    useEffect(() => {
        if (volume == null) return undefined
        let live = true
        setMoreArticles(null)
        // One extra, since the list can include the article being read.
        axios
            .get(`${config.host}/journals/limit/${volume}/4`)
            .then(({ data }) => live && setMoreArticles(data || []))
            .catch(() => live && setMoreArticles([]))
        return () => {
            live = false
        }
    }, [volume])

    // The CMS has no real subheads: authors write a paragraph of only bold text. Mark those,
    // and give the first substantial paragraph a drop cap.
    useEffect(() => {
        const body = bodyRef.current
        if (!body) return
        const paragraphs = [...body.querySelectorAll(':scope > p')]
        paragraphs.forEach((p) => {
            const text = p.textContent.trim()
            const bold = [...p.querySelectorAll('strong, b')].map((el) => el.textContent).join('').trim()
            if (text && text.length < 120 && bold === text) p.classList.add('subhead')
        })
        paragraphs.find((p) => p.textContent.trim().length > 160)?.classList.add('drop-cap')
    }, [article])

    useEffect(() => {
        if (!article?.title) return undefined
        const previous = document.title
        document.title = `${cleanTitle(article.title)} · OIJPCR`
        return () => {
            document.title = previous
        }
    }, [article])

    if (error) {
        return (
            <div className="wrap section">
                <h1 className="page-title">This article could not be loaded</h1>
                <p className="summary mt-4">
                    It may have moved, or the journal is briefly unavailable.{' '}
                    <Link to="/archive" className="text-link">Browse the archive</Link>
                </p>
            </div>
        )
    }

    const tags = tagList(article?.tags)

    return (
        <>
            <ReadingProgress targetRef={bodyRef} />
            <article className="wrap pt-10 md:pt-16">
                {article ? <ArticleHeader article={article} /> : <div className="max-w-[52rem] mx-auto"><LoadingCardFullWidth /></div>}

                {article && (
                    <>
                        <div ref={bodyRef} className="article-body mt-12 md:mt-16">
                            {HTMLReactParser(String(article.content || ''))}
                        </div>

                        <footer className="measure mt-14 pt-8 border-t-2" style={{ borderColor: 'var(--ink)' }}>
                            {tags.length > 0 && (
                                <div className="mb-8 noprint">
                                    <p className="meta mb-3">Topics</p>
                                    <ul className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <li key={tag}><Link className="tag" to={`/tags/${tag}`}>{tag}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <ShareArticleOnSocialMedia />
                                <div className="flex flex-wrap gap-3">
                                    <PrintButton />
                                    <PDFButton pdfLink={article.pdf} />
                                </div>
                            </div>
                        </footer>
                    </>
                )}
            </article>

            {article && (
                <section className="wrap section noprint" aria-labelledby="more-heading">
                    <div className="section-head">
                        <h2 id="more-heading" className="section-title">More from Volume {article.volume}</h2>
                        <Link to={`/archive/${article.volume}`} className="text-link whitespace-nowrap">
                            The full volume <span className="arrow" aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                    <MoreArticles articles={moreArticles} currentId={article._id} isLoading={moreArticles === null} />
                </section>
            )}

            <SubmitArticleFormFullWidth />
        </>
    )
}

export default ReadArticle
