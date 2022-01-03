import React, { Component } from 'react'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser'
import UTCToFormalDate from '../../utils/DateTime'
import female_avatar from '../../assets/teamMembers/female_avatar.svg'
import twitter from '../../assets/shareIcons/twitter.svg'
import linkedin from '../../assets/shareIcons/linkedin.svg'
import shareIcon from '../../assets/shareIcons/shareLink.svg'
import ArticleCardSmall from '../../components/Cards/ArticleCardSmall'
import SubmitArticleFormFullWidth from '../Archive/SubmitArticleFormFullWidth'
import config from '../../config/config'
import { Link } from 'react-router-dom'
import { CircularLoader } from '../../components/utils/Loaders'
import { LoadingCardFullWidth } from '../../components/Cards/LoadingCards'

class ReadArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      journal: "",
      moreJournals: [],
    }
    this.journalHasLoaded = this.journalHasLoaded.bind(this)
    this.handleClickOtherArticle = this.handleClickOtherArticle.bind(this)
  }

  async componentDidMount() {
    try {
      const { urlSlug, id } = this.props
      const url = `${config.host}journals/${urlSlug}/${id}`
      const { data: journal } = await axios.get(url)
      const volume = journal.volume
      const moreJournalsUrl = `${config.host}journals/limit/${volume}/${3}`
      const { data: moreJournals } = await axios.get(moreJournalsUrl)
      this.setState({
        journal: journal,
        moreJournals: moreJournals,
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async handleClickOtherArticle(url) {
    const { urlSlug, id } = url
    const articleURL = `${config.host}journals/${urlSlug}/${id}`
    const { data: journal } = await axios.get(articleURL)
    this.setState({
      journal: journal,
    })

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

  journalHasLoaded() {
    const journal = this.state.journal
    return !(journal === 'undefined' || Object.keys(journal).length === 0)
  }

  render() {
    const journal = this.state.journal
    const author = journal.author
    const content = this.journalHasLoaded() ? journal.content : ''
    // convert createdAt into formal Date
    const date = UTCToFormalDate(journal.createdAt)
    // format date
    const publishedDate = (
      <span className="text-sm leading-3 text-gray-700">
        Published {`${date?.month || ""} ${date?.day || ""}`}
        <sup>{date?.superScript} </sup>
        {date?.year}
      </span>
    )

    return (
      <ReadContainer>
        {
          journal ?
            <>
              <h1 className="mb-4 font-black text-center">
                <span className="text-3xl md:text-5xl">
                  {journal?.title || 'title'}
                </span>
              </h1>

              <div className="flex flex-row justify-center py-1">
                <img src={journal?.authorPhoto || female_avatar}
                  className="inline object-cover w-16 h-16 rounded-full"
                  alt="Author"
                />
                <h2 className="inline py-4 ml-4 text-base font-semibold text-center">
                  <span className="block text-base leading-3">
                    by {author ?? 'author'}
                  </span>
                  {publishedDate}
                </h2>
              </div>

              <div className="flex flex-row justify-center my-4">
                <img src={journal.cover}
                  className="w-full rounded-lg md:w-3/4 h-98"
                  alt="Article Cover"
                />
              </div>
            </>
            : <LoadingCardFullWidth />
        }
        <ShareArticleLinks />
        <div className="mt-16 lg:mx-4">
          {HTMLReactParser(content.toString())}
        </div>

        <Tags tags={journal.tags} />
        <MoreArticles
          journals={this.state.moreJournals}
          handleClick={this.handleClickOtherArticle}
          path={this.props.path}
        />
        <SubmitArticleFormFullWidth />
      </ReadContainer>
    )
  }
}

function ReadContainer(props) {
  return (
    <div className="relative h-full mx-4 md:mx-16">
      <div className="flex flex-col h-full py-2 my-4 md:w-full editor">
        {props.children}
      </div>
    </div>
  )
}

function ShareArticleLinks() {
  const links = [
    {
      url: 'https://www.twitter.com/intent/tweet?url=' + window.location.href,
      img: twitter,
      alt: 'Twitter',
    },
    {
      url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href,
      img: linkedin,
      alt: 'LinkedIn',
    },
    {
      url: window.location.href,
      img: shareIcon,
      alt: 'shareable link',
    },
  ]
  return (
    <div className="fixed right-0 z-50 p-1 bg-white rounded-sm shadow-xl top-1/2">
      <div className="flex flex-col">
        {links.map((link, index) => {
          return (
            <a href={link.url} className="block mx-2 my-2" key={index}
              onClick={navigator.clipboard.writeText(link.url)}
            >
              <img src={link.img} className="w-6 h-6" alt={link.alt} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

function Tags({ tags }) {
  return (
    <div className="flex flex-row flex-wrap my-10">
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
  const cname = "mx-4 my-2 px-4 py-2 block font-semibold text-gray-900 bg-gray-300"
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

function MoreArticles({ journals, path, handleClick }) {
  if (journals?.length < 1) {
    return (
      <CircularLoader height="h-16" width="w-16" />
    )
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold border-b-2 border-gray-900 primary-color">
        More from this volume
      </h1>
      <div className="flex flex-col my-4 md:flex-row justify-evenly">
        {
          journals && journals.length > 1 ?
            journals.map(
              journal => {
                const journalProps = {
                  id: journal._id,
                  coverPhoto: journal.cover,
                  cname: {
                    container: '',
                    button: 'mt-10 flex flex-wrap',
                  },
                  ...journal,
                }

                return (
                  <ArticleCardSmall
                    {...journalProps}
                    handleClick={handleClick}
                    key={journal._id}
                    path={path}
                  />
                )
              }) :
            <CircularLoader height="h-16" width="w-16" />
        }
      </div>
    </div>
  )
}

export default ReadArticle