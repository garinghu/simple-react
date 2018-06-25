import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter as Router } from 'react-router-dom'
import App from './app.js'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
