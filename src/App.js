import React from 'react'
import { useMemo, useState } from 'react'
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom'

import { UserContext } from './UserContext'
import { ToastProvider } from './components/utils/Toast'

import './App.css'
import NavController from './components/Navigation/NavController'
import Admin from './pages/Admin/Admin'
import Login from './pages/Admin/Auth/Login'
import NotFound from './pages/NotFound'
import SignUp from './pages/Admin/Auth/SignUp'

const App = () => {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  const providerValue = useMemo(() =>
      ({ token, setToken, username, setUsername }),
    [token, setToken, username, setUsername],
  )

  return (
    <UserContext.Provider value={providerValue}>
      <ToastProvider>
        <Router>
          <Switch>
            <Route path="/notFound" render={() =>
              <NotFound msg="could not find that"/>}
            />

            <Route path="/admin" render={(props) => <Admin {...props} />}/>
            <Route path="/signup" render={() => <SignUp/>}/>
            <Route path="/login" render={() => <Login/>}/>

            <NavController/>
          </Switch>
        </Router>
      </ToastProvider>
    </UserContext.Provider>
  )
}

export default App
