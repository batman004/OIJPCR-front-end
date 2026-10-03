import axios from 'axios'
import {Component} from 'react'
import config from '../../config/config'

import {
    ArticleHeader,
    ArticleContainer,
    ArticleBody,
    ArticleTags,
    ArticleCitation,
    PublishedDate,
    MoreArticles,
    MoreArticlesContainer,
    ShareArticleOnSocialMedia
} from "../../components/Article";

import {
    PrintButton, PDFButton
} from '../../components/utils'
import {textClip} from '../../utils'
import {trackView} from '../../utils/trackEvent'
import {
    LoadingCardFullWidth
} from '../../components/Loaders'

import SubmitArticleFormFullWidth
    from '../Archive/SubmitArticleFormFullWidth'


class ReadArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            journal: "",
            moreJournals: [],
            timer: true,
            isLoadingOtherArticles: true,
            otherArticlesLoaderMsg: "Loading Articles..."
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.articleHasLoaded = this.articleHasLoaded.bind(this)
        this.handleClickOtherArticle = this.handleClickOtherArticle.bind(this)
    }

    async componentDidMount() {
        try {
            this.startTimer()

            const {urlSlug, id} = this.props
            const url = `${config.host}/journals/${urlSlug}/${id}`
            const {data: article} = await axios.get(url);
            trackView(article._id)

            const volume = article.volume
            const MoreArticlesURL = `${config.host}/journals/limit/${volume}/${3}`
            const {data: moreArticles} = await axios.get(MoreArticlesURL)

            if (moreArticles && moreArticles.length > 1) this.stopTimer()

            this.setState({
                article: article,
                moreArticles: moreArticles,
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }

    startTimer() {
        const timer = setTimeout(() => {
            this.setState(prevState => ({
                isLoadingOtherArticles: !prevState.isLoadingOtherArticles,
                otherArticlesLoaderMsg: "No other articles found."
            }))
        }, config.timeoutValue)

        this.setState({
            timer: timer
        })
    }

    stopTimer() {
        if (this.state.timer) {
            clearTimeout(this.state.timer)

            this.setState(prevState => ({
                isLoadingOtherArticles: !prevState.isLoadingOtherArticles,
                otherArticlesLoaderMsg: ""
            }))
        }
    }

    async handleClickOtherArticle(url) {
        const {urlSlug, id} = url
        const articleURL = `${config.host}/journals/${urlSlug}/${id}`

        const {data: article} = await axios.get(articleURL)
        trackView(article._id)

        this.setState({article: article})

        try {
            window.scroll({
                top: -10, left: 0, behavior: 'smooth',
            })
        } catch (e) {
            // fallback for older browsers
            window.scrollTo(0, 0)
        }
    }

    articleHasLoaded() {
        const article = this.state.article
        if (!article) return false
        return Object.keys(article).length !== 0
    }

    render() {
        const article = this.articleHasLoaded() ? this.state.article : false
        const author = textClip(article?.author, 60)
        const pdfLink = article?.pdf || ''
        const content = this.articleHasLoaded() ? article.content : ''

        return (<ArticleContainer>
            {article ? <ArticleHeader
                article={article}
                author={author}
                publishedDate={<PublishedDate date={article.createdAt}/>}
            /> : <LoadingCardFullWidth/>}


            <ArticleBody content={content}>
                <div
                    className="flex flex-wrap mt-2 mb-6 noprint">
                    <ShareArticleOnSocialMedia articleId={article?._id}/>
                    <PrintButton articleId={article?._id}/>
                    <PDFButton pdfLink={pdfLink} articleId={article?._id}/>
                </div>
            </ArticleBody>

            <ArticleTags tags={article.tags} articleId={article?._id}/>

            <ArticleCitation article={article || undefined}/>

            <MoreArticlesContainer>
                <MoreArticles
                    articles={this.state.moreArticles}
                    handleClick={this.handleClickOtherArticle}
                    path={this.props.path}
                    isLoading={this.state.isLoadingOtherArticles}
                    loaderMsg={this.state.otherArticlesLoaderMsg}
                />
            </MoreArticlesContainer>

            <SubmitArticleFormFullWidth/>
        </ArticleContainer>)
    }
}


export default ReadArticle