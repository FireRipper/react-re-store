import React, { Component } from 'react'
import BookListItem from '../book-list-item'
import { connect } from 'react-redux'

import { withBookstoreService } from '../hoc'
import { booksLoaded } from '../../actions'
import { compose } from '../../utils'

import './book-list.css'

class BookList extends Component {

    componentDidMount() {
        // 1, - receive data
        const { bookstoreService } = this.props
        const data = bookstoreService.getBooks()

        // 2. - dispatch action to store
        this.props.booksLoaded(data)
    }

    render() {
        const { books } = this.props

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

const mapStateToProps = ({ books }) => {
    return {
        books
    }
}

const mapDispatchToProps = {
    booksLoaded
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
