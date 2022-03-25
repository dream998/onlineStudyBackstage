import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import BeforeRouter from './router/beforeRouter'

export default function App() {
  return (
    <div>
      <Header/>
      <Router>
      <Route path={"/"} exact component={BeforeRouter(Home)}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/home"} component={Home}/>
      </Router>
    </div>

  )
}
