import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './page/Login'
import Information from './page/Invigilate'


const App = () => (
  <Switch>
    <Route path="/search" component={Information} />
    <Route path="/home" component={Login} />
    <Redirect from="/" to="/home"></Redirect>
  </Switch>
)

export default App