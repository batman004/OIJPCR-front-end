import {useEffect, useMemo} from 'react'
import Nav from '../Navigation/Nav'
import Footer from '../Footer/Footer'
import FlexContainer from '../utils/FlexContainer'
import {PrintButton, PDFButton} from '../utils'
import {
    ArticleContainer,
    ArticleHeader,
    ArticleBody,
    ArticleTags,
    PublishedDate,
    ShareArticleOnSocialMedia,
} from '../Article'
import {textClip} from '../../utils'

function useFileURL(file, fallback) {
    const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
    useEffect(() => () => url && URL.revokeObjectURL(url), [url])
    return url || fallback
}

// Following a link or button would leave the editor and lose the draft, so only
// links that already open a new tab (or leave the site) are allowed through.
function keepDraftOpen(evt) {
    const control = evt.target.closest('a, button')
    if (!control) return
    evt.preventDefault()
    evt.stopPropagation()
    if (control.tagName !== 'A' || !control.href) return
    const opensElsewhere = control.target === '_blank' || new URL(control.href).origin !== window.location.origin
    if (opensElsewhere) window.open(control.href, '_blank', 'noopener,noreferrer')
}

// Renders an unsaved article with the same layout and components as the public article page.
const ArticlePreview = ({article, coverFile, authorPhotoFile, pdfFile, onClose}) => {
    const cover = useFileURL(coverFile, article.cover)
    const authorPhoto = useFileURL(authorPhotoFile, article.authorPhoto)
    const pdfLink = useFileURL(pdfFile, article.pdf)

    useEffect(() => {
        const closeOnEscape = evt => evt.key === 'Escape' && onClose()
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', closeOnEscape)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', closeOnEscape)
        }
    }, [onClose])

    const previewArticle = {...article, cover, authorPhoto}

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white" role="dialog" aria-label="Article preview">
            <div className="sticky top-0 z-10 flex flex-row items-center justify-between px-4 py-3 text-white bg-gray-900 shadow-lg md:px-8">
                <p className="text-sm md:text-base">
                    <span className="font-bold">Preview</span>
                    <span className="hidden ml-2 text-gray-300 sm:inline">
                        Not published yet. This is how the article will look on the website.
                    </span>
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-bold text-gray-900 uppercase bg-white rounded"
                >
                    Back to editor
                </button>
            </div>

            <div className="flex flex-col items-center" onClickCapture={keepDraftOpen}>
                <Nav/>
                <FlexContainer cname="max-w-7xl">
                    <ArticleContainer>
                        <ArticleHeader
                            article={previewArticle}
                            author={textClip(article.author, 60)}
                            publishedDate={<PublishedDate date={article.createdAt || new Date().toISOString()}/>}
                        />
                        <ArticleBody content={article.content}>
                            <div className="flex flex-wrap mt-2 mb-6 noprint">
                                <ShareArticleOnSocialMedia/>
                                <PrintButton/>
                                <PDFButton pdfLink={pdfLink}/>
                            </div>
                        </ArticleBody>
                        <ArticleTags tags={article.tags}/>
                    </ArticleContainer>
                </FlexContainer>
                <Footer/>
            </div>
        </div>
    )
}


export default ArticlePreview
