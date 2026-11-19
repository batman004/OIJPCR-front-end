import React from 'react'
import { useMemo, useState } from 'react'
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom'

import config from './config/config'

import { UserContext } from './UserContext'

import './App.css'
import NavController from './components/Navigation/NavController'
import Admin from './pages/Admin/Admin'
import Login from './pages/Admin/Auth/Login'
import NotFound from './pages/NotFound'
import SignUp from './pages/Admin/Auth/SignUp'

const App = () => {
  const [token, setToken] = useState('')

  const providerValue = useMemo(() =>
      ({ token, setToken }),
    [token, setToken],
  )

  return (
    <UserContext.Provider value={providerValue}>
      <Router>
        <Switch>
          <Route path="/notFound" render={() =>
            <NotFound msg="could not find that"/>}
          />

          {/* The static preview is read-only: no admin or auth. */}
          {config.snapshot
            ? <Route path={['/admin', '/signup', '/login']} render={() => <Redirect to="/"/>}/>
            : [
              <Route key="admin" path="/admin" render={(props) => <Admin {...props} />}/>,
              <Route key="signup" path="/signup" render={() => <SignUp/>}/>,
              <Route key="login" path="/login" render={() => <Login/>}/>,
            ]}

          <NavController/>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App
