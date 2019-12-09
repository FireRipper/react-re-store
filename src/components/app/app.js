import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CardPage, HomePage } from '../pages'
import ShopHeader from '../shop-header'

const App = () => {
    return (
        <main role='main' className='container'>
            <ShopHeader numItems={5} total={210}/>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/card/' component={CardPage} />
                <Route />
            </Switch>
        </main>)
}

export default App
