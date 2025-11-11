'use strict'

const BOOK_STORAGE_KEY = 'bookDB'

const RED_IMG = 'img/red.png'
const BLUE_IMG = 'img/blue.png'
const YELLOW_IMG = 'img/yellow.png'

const STAR = '⭐'

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
    updateNotification('Removed book')
    _saveBooks()
}

function updatePrice(name, price) {
    const bookToUpdate = gBooks.findIndex(book => book.name === name)
    gBooks[bookToUpdate].price = price
    updateNotification('Updated book')
    _saveBooks()
}

function addBook(name, price) {
    if (!name || !price) return alert('Cannot add blank title/price')

    const book = { name, price, img: getRandomImg(), rating: getRandomInt(1,5)}
    gBooks.push(book)
    updateNotification('Added book')
    _saveBooks()
}

function getBookByName(name) {
    const book = gBooks.find(book => book.name === name)
    return book
}

function getBookStats(){
    const expensiveBooks = gBooks.filter(book => book.price > 200).length
    const averageBooks = gBooks.filter(book => book.price <= 200 && book.price >= 80).length
    const cheapBooks = gBooks.filter(book => book.price < 80).length
    return {expensiveBooks, averageBooks, cheapBooks}
}

function createBook(name, price, img, rating){
    return { name, price, img, rating}
}

function createBooks() {
    gBooks = loadFromStorage(BOOK_STORAGE_KEY)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            createBook('The Adventures of Lori Ipsi', 120, getRandomImg(), getRandomInt(1,5)),
            createBook('World Atlas', 300, getRandomImg(), getRandomInt(1,5)),
            createBook('Zorba the Greek', 87, getRandomImg(), getRandomInt(1,5))
        ]

        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage(BOOK_STORAGE_KEY, gBooks)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomImg(){
    const imgs = [BLUE_IMG, RED_IMG, YELLOW_IMG]
    return imgs[getRandomInt(0, imgs.length - 1)]
}