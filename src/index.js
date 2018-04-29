import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import store from './store/store.js'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
