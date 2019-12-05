import React, { Fragment } from 'react'
import './book-list-item.css'

const BookListItem = ({ book }) => {

    const { title, author } = book

    return (
        <Fragment>
            <span>Title: {title}</span>
            <strong> Author: {author}</strong>
        </Fragment>
    )
}

export default BookListItem
