import React, { Component } from 'react'
import Welcome from './components/welcome'

const App = ({ store }) => (
  <div>
    <Welcome store={store} />
  </div>
)

export default App