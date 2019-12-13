import {
    BOOK_ADDED_TO_CART, ALL_BOOKS_REMOVED_FROM_CART,
    FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS, BOOK_REMOVED_FROM_CART
} from '../types'

const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 395
}

const updateCartItems = (cardItems, item, idx) => {
    if (idx === -1) {
        return [
            ...cardItems,
            item
        ]
    }
    return [
        ...cardItems.slice(0, idx),
        item,
        ...cardItems.slice(idx + 1)
    ]
}

const updateCartItem = (book, item = {}) => {
    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item

    return {
        id,
        title,
        count: count + 1,
        total: total + book.price
    }
}

const reducer = (state = initialState, action) => {

    console.log(action.type)
    switch (action.type) {
    case FETCH_BOOKS_REQUEST:
        return {
            ...state,
            books: [],
            loading: true,
            error: null
        }
    case FETCH_BOOKS_SUCCESS:
        return {
            ...state,
            books: action.payload,
            loading: false,
            error: null
        }
    case FETCH_BOOKS_FAILURE:
        return {
            ...state,
            books: [],
            loading: false,
            error: action.payload
        }
    case BOOK_ADDED_TO_CART:
        const bookId = action.payload
        const book = state.books.find((book) => book.id === bookId)
        const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId)
        const item = state.cartItems[itemIndex]

        const newItem = updateCartItem(book, item)
        return {
            ...state,
            cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
        }
    case BOOK_REMOVED_FROM_CART: {
        const quantityId = action.payload
        const quantityIndex = state.cartItems.findIndex(({ id }) => id === quantityId)
        const quantityItem = state.cartItems[quantityIndex]

        let newQuantity

        if(quantityItem) {
            newQuantity = {
                ...quantityItem,
                count: quantityItem.count - 1,
                total: quantityItem.total / 2
            }
        }

        return {
            ...state,
            cartItems: [
                ...state.cartItems.slice(0, quantityIndex),
                newQuantity,
                ...state.cartItems.slice(quantityIndex + 1)
            ]
        }
    }
    case ALL_BOOKS_REMOVED_FROM_CART: {
        const delId = action.payload
        const cartIndex = state.cartItems.findIndex(({ id }) => id === delId)

        return {
            ...state,
            cartItems: [
                ...state.cartItems.slice(0, cartIndex),
                ...state.cartItems.slice(cartIndex + 1)
            ]
        }
    }

    default:
        return state
    }
}

export default reducer
