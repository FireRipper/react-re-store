import React, { Component } from 'react'
import BookListItem from '../book-list-item'
import { connect } from 'react-redux'

import { withBookstoreService } from '../hoc'
import { booksLoaded, booksRequested, booksError } from '../../actions'
import { compose } from '../../utils'

import Spinner from '../spinner'
import './book-list.css'
import ErrorIndicator from '../error-indicator'

class BookList extends Component {

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
}

const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps
    return {
        fetchBooks: () => {
            dispatch(booksRequested())
            // 1, - receive data
            // 2. - dispatch action to store
            bookstoreService.getBooks()
                .then((data) => {
                    dispatch(booksLoaded(data))
                })
                .catch((err) => dispatch(booksError(err)))
        }
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
