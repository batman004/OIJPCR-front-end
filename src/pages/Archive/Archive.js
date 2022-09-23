import { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Volume from './Volume'
import { VolumeCard } from "../../components/Cards";
import FlexContainer from '../../components/utils/FlexContainer'
import ReadArticle from '../Articles/ReadArticle'
import SubmitArticleFormFullWidth from './SubmitArticleFormFullWidth'
import config from '../../config/config'
import { CircularLoader } from "../../components/Loaders";

class Archive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      archives: [],
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`${config.host}/journals/archive`)
      this.setState({ archives: data })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  render() {
    const { path } = this.props.match

    return (
      <FlexContainer cname="max-w-7xl">
        <Switch>
          <Route exact path="/archive"
            render={(props) => <Home {...props} archives={this.state.archives} />}
          />
          {/* Archives must be passed as a prop */}
          <Route exact path="/archive/:volume"
            render={
              (routeProps) =>
                <RenderVolumePage
                  archives={this.state.archives}
                  {...routeProps}
                />
            }
          />

          <Route exact path={`${path}/:urlSlug/:id`}
            render={
              (routeProps) =>
                <DisplayArticle
                  {...routeProps}
                />
            }
          />

          <Route exact path="/archive/*"
            render={() => <Redirect to="/notFound" />}
          />
        </Switch>
      </FlexContainer>
    )
  }
}

function Home(props) {
  return (
    <>
      <div className="flex flex-wrap md:flex-row flex-column justify-evenly">
        {
          props?.archives?.length > 0 ?
            props.archives.map((archive, index) =>
              <VolumeCard {...archive} key={index} />,
            )
            :
            <CircularLoader height="h-16" width="w-16" />
        }
      </div>
      <div className="mx-2 md:mx-12">
        <SubmitArticleFormFullWidth />
      </div>
    </>
  )
}

function RenderVolumePage(props) {
  const { path } = props.match
  const { volume } = props.match.params
  const archive = props.archives.filter(ele => ele.volume === parseInt(volume))
  return (
    <Volume path={path} volume={volume} archive={archive[0]} />
  )
}

function DisplayArticle(props) {
  const { path } = props.match
  const { urlSlug, id } = props.match.params
  return (
    <ReadArticle urlSlug={urlSlug} id={id} path={path} />
  )
}


export default Archive