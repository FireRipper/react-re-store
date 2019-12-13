import React, { Component } from 'react'
import BookListItem from '../book-list-item'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withBookstoreService } from '../hoc'
import { bookAddedToCart, fetchBooks } from '../../actions'
import { compose } from '../../utils'

import './book-list.css'

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCard={onAddedToCart}/>
    }
}

const BookList = ({ books, onAddedToCard }) => {
    return (
        <div>
            <ul className='book-list'>
                {books.map((book) => {
                    const { id, ...itemProps } = book
                    return (
                        <li key={id}>
                            <BookListItem
                                book={itemProps}
                                onAddedToCart={() => onAddedToCard(id)}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = ({bookList: { books, loading, error }}) => {
    return { books, loading, error }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return bindActionCreators( {
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch)
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)
