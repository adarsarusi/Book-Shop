'use strict'

const BOOK_STORAGE_KEY = 'bookDB'

var gBooks
createBooks()

//Added storage so no need for hard coded default anymore

// const gBooks = [
//     {
//         name: 'The Adventures of Lori Ipsi',
//         price: 120
//     },
//     {
//         name: 'World Atlas',
//         price: 300
//     },
//     {
//         name: 'Zorba the Greek',
//         price: 87
//     }]


// function getBooks() {
//     return gBooks
// }

// modified gBooks to support search, showing only specific books
function getBooks(filterBy){
    if (!filterBy) return gBooks

    const filter = filterBy.toLowerCase()
    return gBooks.filter(book => book.name.toLowerCase().includes(filter))
}

function removeBook(name) {
    const bookToRemove = gBooks.findIndex(book => book.name === name)
    gBooks.splice(bookToRemove, 1)
    _saveBooks()
}

function updatePrice(name, price) {
    const bookToUpdate = gBooks.findIndex(book => book.name === name)
    gBooks[bookToUpdate].price = price
    _saveBooks()
}

function addBook(name, price) {
    const book = { name, price }
    gBooks.push(book)
    _saveBooks()
}

function getBookByName(name) {
    const book = gBooks.find(book => book.name === name)
    return book
}

function createBook(name, price){
    return { name, price }
}

function createBooks() {
    gBooks = loadFromStorage(BOOK_STORAGE_KEY)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            createBook('The Adventures of Lori Ipsi', 120),
            createBook('World Atlas', 300),
            createBook('Zorba the Greek', 87)
        ]

        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage(BOOK_STORAGE_KEY, gBooks)
}