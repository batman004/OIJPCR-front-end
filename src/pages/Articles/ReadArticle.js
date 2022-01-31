import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser'
import UTCToFormalDate from '../../utils/DateTime'
import config from '../../config/config'

import SubmitArticleFormFullWidth from '../Archive/SubmitArticleFormFullWidth'
import {
  ArticleHeader,
  ArticleContainer,
  MoreArticles,
  ShareArticleOnSocialMedia
} from "../../components/Article";
import PrintButton from '../../components/utils/PrintButton'
import { LoadingCardFullWidth } from '../../components/Loaders'

class ReadArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      journal: "",
      moreJournals: [],
    }
    this.articleHasLoaded = this.articleHasLoaded.bind(this)
    this.handleClickOtherArticle = this.handleClickOtherArticle.bind(this)
  }

  async componentDidMount() {
    try {
      const { urlSlug, id } = this.props
      const url = `${config.host}journals/${urlSlug}/${id}`
      const { data: article } = await axios.get(url);

      const volume = article.volume
      const MoreArticlesURL = `${config.host}journals/limit/${volume}/${3}`
      const { data: moreArticles } = await axios.get(MoreArticlesURL)

      this.setState({
        article: article,
        moreArticles: moreArticles,
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async handleClickOtherArticle(url) {
    const { urlSlug, id } = url
    const articleURL = `${config.host}journals/${urlSlug}/${id}`

    const { data: article } = await axios.get(articleURL)

    this.setState({ article: article })

    try {
      window.scroll({
        top: -10,
        left: 0,
        behavior: 'smooth',
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
    const author = article?.author
    const content = this.articleHasLoaded() ? article.content : ''
    // convert createdAt into formal Date
    const date = UTCToFormalDate(article.createdAt)
    // format date
    const publishedDate = (
      <span className="text-sm leading-3 text-gray-700">
        Published {`${date?.month || ""} ${date?.day || ""}`}
        <sup>{date?.superScript} </sup>
        {date?.year}
      </span>
    )

    return (
      <ArticleContainer>
        {
          article ? <ArticleHeader
            article={article}
            author={author}
            publishedDate={publishedDate}
          />
            : <LoadingCardFullWidth />
        }


        <div className="max-w-full mt-16 text-justify lg:mx-4">
          {HTMLReactParser(content.toString())}

          <div className="flex flex-wrap mt-2 mb-6 noprint">
            <ShareArticleOnSocialMedia />
            <PrintButton />
          </div>
        </div>

        <Tags tags={article.tags} />

        <MoreArticles
          articles={this.state.moreArticles}
          handleClick={this.handleClickOtherArticle}
          path={this.props.path}
        />
        <SubmitArticleFormFullWidth />
      </ArticleContainer>
    )
  }
}


function Tags({ tags }) {
  return (
    <div className="flex flex-row flex-wrap mt-2 mb-6 noprint">
      {
        tags?.split(', ').map(
          (tag, index) => {
            const itemLink = {
              value: tag,
              url: `/tags/${tag}`,
            }
            return <TagBlock
              index={index}
              key={index}
              {...itemLink}
            />
          })
      }
    </div>
  )
}

function TagBlock(props) {
  const cname = "mx-2 my-2 px-4 py-2 block font-semibold text-center text-white border-0 border-indigo-400 rounded bg-oijpcr-blue focus:outline-none"
  const { url, value, index, newTab } = props

  return (
    <li className={cname} key={index}>
      {
        newTab ?
          <a href={url} target="_blank" rel="noreferrer">
            {value}
          </a>
          :
          <Link to={url}>
            {value}
          </Link>
      }
    </li>
  )
}


export default ReadArticle