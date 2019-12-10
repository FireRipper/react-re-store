import {
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_FAILURE,
    BOOK_ADDED_TO_CART
} from '../types'

const booksLoaded = (newBooks) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: newBooks
    }
}

const booksRequested = () =>  {
    return {
        type: FETCH_BOOKS_REQUEST
    }
}

const booksError = (error) => {
    return {
        type: FETCH_BOOKS_FAILURE,
        payload: error
    }
}

const bookAddedToCart = (bookId) => {
    return {
        type: BOOK_ADDED_TO_CART,
        payload: bookId
    }
}

const fetchBooks = (bookstoreService, dispatch) => () => {
    dispatch(booksRequested())
    // 1, - receive data
    // 2. - dispatch action to store
    bookstoreService.getBooks()
        .then((data) => {
            dispatch(booksLoaded(data))
        })
        .catch((err) => dispatch(booksError(err)))
}

export {
    fetchBooks,
    bookAddedToCart
}
