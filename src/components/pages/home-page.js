import React from 'react'
import BookList from '../book-list'

const HomePage = () => {
    const _books = [
        {
            id: 1,
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler'
        },
        {
            id: 2,
            title: 'Release IT',
            author: 'Micheal T. Nygard'
        }
    ]

    return (
        <div>
            <BookList books={_books} />
        </div>
    )}

export default HomePage
