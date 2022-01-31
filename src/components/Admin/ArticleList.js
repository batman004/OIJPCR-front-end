import { Component } from 'react'
import axios from 'axios'
import {
  Switch,
  Route,
} from 'react-router-dom'
import ReadArticle from '../../pages/Articles/ReadArticle'
import config from '../../config/config'
import { UserContext } from '../../UserContext'
import { ArticleCardAdmin } from "../Admin/Cards";

class ArticleList extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      token: ''
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(`${config.host}journals`)
    this.setState({ articles: data, token: this.context?.token })
  }

  render() {
    const { path } = this.props.match
    return (
      <div className="flex-grow">
        <Switch>
          <Route exact path={`${path}/journals/:urlSlug/:id`} render={(props) =>
            <ReadArticle {...props} />}
          />
          <Route path={path} render={() =>
            <Articles articles={this.state.articles} />}
          />
        </Switch>
      </div>
    )
  }
}

function Articles({ articles }) {
  let articlesList;
  
  if (typeof articles == 'undefined')
    articlesList = '...Loading'
  else if (articles.length === 0)
    articlesList = 'No Articles Found'
  else articlesList = createArticles(articles)

  return (
    <div className="h-full md:mx-4">
      <div className="flex flex-row flex-wrap w-full h-full py-2 my-4 justify-evenly editor">
        {articlesList}
      </div>
    </div>
  )
}

function createArticles(articles) {
  return articles.map((article) => {
    const articleProps = {
      id: article._id,
      coverPhoto: article.cover,
      cname: {
        container: '',
        button: 'mt-10 flex flex-wrap',
      },
      path: '/admin',
      ...article,
    }
    return <ArticleCardAdmin {...articleProps} key={article._id} />
  })
}

export default ArticleList