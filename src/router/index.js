import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../page/Login'
import Invigilate from '../page/Invigilate'
import mobxstore from '../store/store.js'

const Main = () => (
    
    <Switch>
        <Route path='/' render={() => (
            <Login />
        )}/>
        <Route path='/invigilate' render={() => (
            <Invigilate  />
        )}/>
    </Switch>
)

export default Main

