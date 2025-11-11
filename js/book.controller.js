'use strict'

var gFilterBy = ''

const gQueryOptions = {
    filterBy: { name: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 4 },
}

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks(gQueryOptions)

    var strHTMLs

    if (books.length < 1) {
        strHTMLs = [`
        <tr>
            <td colspan="4" class="no-books-found">No Matching books were found...</td>
        </tr>`
        ]
    } else {
        strHTMLs = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td class="book-btns">${STAR.repeat(book.rating)}</td>
            <td class="book-btns"><button class="btn1" onclick="onShowDetails('${book.id}')">Read</button>
            <button class="btn2" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="btn3" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
        )
    }

    const elTable = document.querySelector('.book-shop')
    elTable.innerHTML = strHTMLs.join('')

    renderStats()
}

function renderStats() {
    const elStats = document.querySelector('.stats')

    const bookStats = getBookStats()

    elStats.innerHTML = `Expensive Books: ${bookStats.expensiveBooks}, Average Books: ${bookStats.averageBooks}, Cheap Books: ${bookStats.cheapBooks}`
}

function onRemoveBook(id) {
    removeBook(id)
    renderBooks()
}

function onUpdateBook(id) {
    const newPrice = +prompt('Change price')
    updatePrice(id, newPrice)
    renderBooks()
}

function onAddBook() {
    const bookName = prompt('Choose name')
    const bookPrice = +prompt('Choose price')
    if (!bookName || !bookPrice) return alert('Cannot add blank title/price')
    addBook(bookName, bookPrice)
    renderBooks()
}

function onShowDetails(id) {
    const elBookDetailsModal = document.querySelector('dialog.book-details-modal')
    const elContent = elBookDetailsModal.querySelector('.content')
    const book = getBookById(id)
    elContent.innerHTML = `<h2>${book.name}</h2></br>
                           <h3>Price: ${book.price}, Rating: ${book.rating} </h3>
                           <img class="imgInModal" src="${book.img}">`
    elBookDetailsModal.showModal()
}

function onSetFilterBy() {
    const elTxtInput = document.querySelector('.book-filter .search-book-input')
    const elRatingInput = document.querySelector('.sort-field')

    gQueryOptions.filterBy.name = elTxtInput.value
    gQueryOptions.filterBy.rating = +elRatingInput.value

    renderBooks()
}

function onSetSortBy() {
    const elSortDir = document.querySelector('input[name="sort-order"]:checked')

    gQueryOptions.sortBy.field = elSortDir.value
    gQueryOptions.sortBy.dir = elSortDir.value === 'desc' ? -1 : 1

    renderBooks()
}

function onClearSearch(ev) {
    ev.preventDefault()
    const elSearch = document.querySelector('.search-book-input')
    elSearch.value = gFilterBy = ''
    const elSort = document.querySelector('.sort-field')
    elSort.value = ''

    gQueryOptions.filterBy.name = ''
    gQueryOptions.filterBy.rating = 0

    renderBooks()
}

function updateNotification(update) {
    const notification = document.querySelector('.notification')
    notification.innerHTML = update + ' successfully!'
    notification.style.display = 'block'
    setTimeout(() => { notification.style.display = 'none' }, 2000)
}