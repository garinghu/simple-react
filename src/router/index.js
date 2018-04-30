import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Welcome from '../components/welcome.js'
import mobxstore from '../store/store.js'

const Main = () => (
    <Switch>
        <Route exact path='/' render={() => (
            <Welcome mobxstore={mobxstore} />
        )}/>
    </Switch>
)

export default Main

