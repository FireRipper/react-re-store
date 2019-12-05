import React, { Component } from 'react'
import BookListItem from '../book-list-item'

import './book-list.css'

class BookList extends Component {
    render() {
        const { books } = this.props

        return (
            <div>
                <ul>
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

export default BookList
