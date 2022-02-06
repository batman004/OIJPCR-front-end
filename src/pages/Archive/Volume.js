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
        `${config.host}journals/all/${volume}/info`,
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
        <div className="py-6 mx-4 my-6 md:mx-12 md:px-4">
          <h1 className="text-5xl font-black text-gray-900">Volume {volume}</h1>
          <h5 className="my-2 text-xl font-black text-gray-900">Editor's Note</h5>
          <p className="max-w-4xl mt-4 text-lg text-justify">{about}</p>
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