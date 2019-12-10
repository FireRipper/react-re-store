import React, { Component } from 'react'
import BookListItem from '../book-list-item'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

import { connect } from 'react-redux'
import { withBookstoreService } from '../hoc'
import { fetchBooks } from '../../actions'
import { compose } from '../../utils'

import './book-list.css'

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, loading, error } = this.props

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books}/>
    }
}

const BookList = ({ books }) => {
    return (
        <div>
            <ul className='book-list'>
                {books.map((book) => {
                    const { id, ...itemProps } = book
                    return (
                        <li key={id}><BookListItem book={itemProps} /></li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error }
}

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return { fetchBooks: fetchBooks(bookstoreService, dispatch) }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)
