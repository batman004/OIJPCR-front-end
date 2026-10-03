import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Redirect, Route, Switch } from 'react-router-dom'

import FlexContainer from '../../components/utils/FlexContainer'
import AdminNav from './AdminNav'

import NewArticle from './Article/NewArticle'
import EditArticle from './Article/EditArticle'
import ArticleList from '../../components/Admin/ArticleList'

import NewVolume from './Volume/NewVolume'
import EditVolume from './Volume/EditVolume'
import VolumeList from '../../components/Admin/VolumeList'
import { UserContext } from '../../UserContext'
import config from '../../config/config'
import { NewArticleProps } from './Article/DefaultData'
import Dashboard from './Metrics/Dashboard'
import { AuthHandler } from './utils'

function isJwtExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return !payload.exp || payload.exp * 1000 <= Date.now()
  } catch (e) {
    return true
  }
}

const Admin = (props) => {
  const { token, setToken, username, setUsername } = useContext(UserContext)

  useEffect(() => {
    const authToken = localStorage.getItem("jwt")
    if (!authToken || isJwtExpired(authToken)) {
      localStorage.removeItem("jwt")
      if (token) setToken('')
      return
    }
    if (authToken !== token) setToken(authToken)
  }, [token, setToken])

  // The JWT only carries an id, so look the name up once per session. This also
  // covers sessions restored from localStorage after a page refresh.
  useEffect(() => {
    if (!token || username) return
    let cancelled = false

    AuthHandler.currentUser(token)
      .then((name) => { if (!cancelled) setUsername(name) })
      .catch((err) => {
        if (cancelled || err.response?.status !== 401) return
        localStorage.removeItem("jwt")
        setToken('')
      })

    return () => { cancelled = true }
  }, [token, username, setUsername, setToken])

  const Logout = async () => {
    const headers = {
      'Authorization': token ? `Bearer ${token}` : null,
      'Content-Type': 'application/json',
    }

    const { data } = await axios.get(`${config.host}/admin/logout`,  {
      withCredentials: true,
      headers: headers,
    })

    if (data.status === 'success') {
      localStorage.setItem("jwt", "")
      setToken('')
      setUsername('')
    }
  }

  if (!token)
    return <Redirect to="/login"/>

  const { path } = props.match

  return (
    <>
      <AdminNav
        token={token}
        username={username}
        Logout={Logout}
      />
      <FlexContainer cname="m-2">
        <Switch>
          <Route exact path="/admin">
            <Dashboard/>
          </Route>

          <Route exact path="/admin/new/volume">
            <NewVolume/>
          </Route>

          <Route exact path="/admin/list/volume"
                 render={(props) => <VolumeList {...props} />}
          />

          <Route exact path="/admin/list/volume/:volume"
                 render={(props) => <EditVolume {...props} />}
          />

          <Route exact path={`${path}/:urlSlug/:id`}
                 render={(props) => <EditArticle {...props} />}
          />

          <Route exact path="/admin/new">
            <NewArticle {...NewArticleProps} />
          </Route>

          <Route exact path="/admin/list"
                 render={(props) => <ArticleList {...props} />}
          />

          <Route exact path="/admin/*"
                 render={() => <Redirect to="/notFound"/>}
          />
        </Switch>
      </FlexContainer>
    </>
  )
}

export default Admin