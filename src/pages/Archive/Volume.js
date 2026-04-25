import React, { Component } from 'react'
import axios from 'axios'
import ArticleList from './ArticleList'
import config from '../../config/config'

class Volume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      journals: null,
    }
  }

  async componentDidMount() {
    try {
      const { volume } = this.props

      const { data: journals } = await axios.get(
        `${config.host}/journals/all/${volume}/info`,
      )

      this.setState({ journals: journals })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render() {
    const { path, volume, archive: volumeInfo } = this.props
    const about = volumeInfo ? volumeInfo.about : ''
    return (
      <div className="flex-grow">
        <div className="py-8 px-4 sm:px-6 lg:px-16 my-6">
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}
          >Archive</p>
          <h1
            className="text-3xl md:text-5xl font-serif font-bold pb-4"
            style={{
              color: 'var(--color-primary)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >Volume {volume}</h1>
          <h5
            className="mt-6 mb-3 text-base font-bold uppercase tracking-wider"
            style={{ color: 'var(--color-primary)', letterSpacing: '0.06em' }}
          >Editor's Note</h5>
          <p
            className="max-w-3xl mt-2 leading-relaxed"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 1.8,
              color: 'var(--color-text)',
            }}
          >{about}</p>
        </div>
        <ArticleList
          journals={this.state.journals}
          path={path}
          volume={volume}
        />
      </div>
    )
  }
}

export default Volume