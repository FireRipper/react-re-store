import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'

const logMiddleware = ({ getState }) => (dispatch) => (action) => {
    console.log(action.type, getState())
    return dispatch(action)
}

const stringMiddleware = () => (next) => (action) => {
    if(typeof action ===  'string') {
        return next({
            type:action
        })
    }
    return next(action)
}

const store = createStore(reducer,
    applyMiddleware(
        stringMiddleware,
        logMiddleware
    )
)

store.dispatch('HELLO_WORLD')

export default store

/*const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    const originalDispatch = store.dispatch
    store.dispatch = (action) => {

        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            })
        }

        return originalDispatch(action)
    }

    return store
}*/

/*const logEnhancer = (createStore) => (...args) => {
    /!*-----------------------(store) -----------------------*!/
    const store = createStore(...args)
    /!*----------------(dispatch) ---------------------*!/
    const originalDispatch = store.dispatch
    /!*-----------------------(action) --------------------*!/
    store.dispatch = (action) => {
        console.log(action.type)
        return originalDispatch(action)
    }
    return store
}*/
