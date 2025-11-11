'use strict'

const BOOK_STORAGE_KEY = 'bookDB'

const RED_IMG = 'img/red.png'
const BLUE_IMG = 'img/blue.png'
const YELLOW_IMG = 'img/yellow.png'

const STAR = '⭐'

var gBooks
createBooks()

function getBooks(options = {}) {
    const filterBy = options.filterBy
    const sortBy = options.sortBy
    const page = options.page

    var booksToDisplay = _filterBooks(filterBy)

    if (sortBy.field) {
        booksToDisplay.sort((book1, book2) => (book1.rating - book2.rating) * sortBy.dir)
    }

    return booksToDisplay

    // const startIdx = page.idx * page.size
    // const endIdx = startIdx + page.size

    // return booksToDisplay.slice(startIdx, endIdx)
}

function removeBook(id) {
    const bookToRemove = gBooks.findIndex(book => book.id === id)
    gBooks.splice(bookToRemove, 1)
    updateNotification('Removed book')
    _saveBooks()
}

function updatePrice(id, price) {
    const bookToUpdate = gBooks.findIndex(book => book.id === id)
    gBooks[bookToUpdate].price = price
    updateNotification('Updated book')
    _saveBooks()
}

function addBook(name, price) {
    const book = { id: makeId(), name, price, img: getRandomImg(), rating: getRandomInt(1, 5) }
    gBooks.push(book)
    updateNotification('Added book')
    _saveBooks()
}

function getBookById(id) {
    const book = gBooks.find(book => book.id === id)
    return book
}

function getBookStats() {
    return gBooks.reduce((acc, book) => {
        if (book.price > 200) acc.expensiveBooks++
        else if (book.price < 80) acc.cheapBooks++
        else acc.averageBooks++

        return acc
    }, { expensiveBooks: 0, averageBooks: 0, cheapBooks: 0 })
}

function _createBook(name, price) {
    return { id: makeId(), name, price, img: getRandomImg(), rating: getRandomInt(1, 5) }
}

function createBooks() {
    gBooks = loadFromStorage(BOOK_STORAGE_KEY)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('The Adventures of Lori Ipsi', 120),
            _createBook('World Atlas', 300),
            _createBook('Zorba the Greek', 87)
        ]

        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage(BOOK_STORAGE_KEY, gBooks)
}

function _filterBooks(filterBy) {
    var booksToDisplay = gBooks.slice()

    if (filterBy.name) {
        const filter = filterBy.name.toLowerCase()
        booksToDisplay = booksToDisplay.filter(book => book.name.toLowerCase().includes(filter))
    }

    if (filterBy.rating) {
        const rating = filterBy.rating
        booksToDisplay = booksToDisplay.filter(book => book.rating >= rating)
    }

    return booksToDisplay
}