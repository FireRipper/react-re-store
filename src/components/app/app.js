import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CardPage, HomePage } from '../pages'

const App = () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/card/' component={CardPage} />
                <Route />
            </Switch>
        </div>)
}

export default App
