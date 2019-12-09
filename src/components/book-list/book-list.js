import React, { Component } from 'react'
import BookListItem from '../book-list-item'
import { connect } from 'react-redux'

import { withBookstoreService } from '../hoc'
import { booksLoaded } from '../../actions'
import { compose } from '../../utils'

import './book-list.css'
import Spinner from '../spinner'

class BookList extends Component {

    componentDidMount() {
        // 1, - receive data
        // 2. - dispatch action to store
        const { bookstoreService, booksLoaded } = this.props
        bookstoreService.getBooks()
            .then((data) => {
                booksLoaded(data)
            })
    }

    render() {
        const { books, loading } = this.props

        if (loading) {
            return <Spinner />
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

const mapStateToProps = ({ books, loading }) => {
    return { books, loading }
}

const mapDispatchToProps = {
    booksLoaded
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
