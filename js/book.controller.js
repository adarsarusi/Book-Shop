'use strict'

var gFilterBy = ''

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks(gFilterBy)

    var tableHeader
    var strHTMLs

    if (books.length < 1) {
        tableHeader =
            `<tr>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
        </tr>`

        strHTMLs =[`
        <tr>
            <td colspan="4" class="no-books-found">No Matching books were found...</td>
        </tr>`
        ]
    } else {
        tableHeader =
            `<tr>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
        </tr>`
        strHTMLs = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td class="book-btns">${STAR.repeat(book.rating)}</td>
            <td class="book-btns"><button class="btn1" onclick="onShowDetails('${book.name}')">Read</button>
            <button class="btn2" onclick="onUpdateBook('${book.name}')">Update</button>
            <button class="btn3" onclick="onRemoveBook('${book.name}')">Delete</button></td>
        </tr>`
        )
    }

    const elTable = document.querySelector('.book-shop')
    elTable.innerHTML = tableHeader + strHTMLs.join('')

    renderStats()
}

function renderStats() {
    const elStats = document.querySelector('.stats')

    const bookStats = getBookStats()

    elStats.innerHTML = `Expensive Books: ${bookStats.expensiveBooks}, Average Books: ${bookStats.averageBooks}, Cheap Books: ${bookStats.cheapBooks}`
}

function onRemoveBook(name) {
    removeBook(name)
    renderBooks()
}

function onUpdateBook(name) {
    const newPrice = +prompt('Change price')
    updatePrice(name, newPrice)
    renderBooks()
}

function onAddBook() {
    const bookName = prompt('Choose name')
    const bookPrice = +prompt('Choose price')
    addBook(bookName, bookPrice)
    renderBooks()
}

function onShowDetails(name) {
    const elBookDetailsModal = document.querySelector('dialog.book-details-modal')
    const elContent = elBookDetailsModal.querySelector('.content')
    const book = getBookByName(name)
    elContent.innerHTML = `<h2>${book.name}</h2></br>
                           <h3>Price: ${book.price}, Rating: ${book.rating} </h3>
                           <img class="imgInModal" src="${book.img}">`
    elBookDetailsModal.showModal()
}

function filterByInput(input) {
    // ev.preventDefault()
    gFilterBy = input
    renderBooks()
}

function clearSearch(ev) {
    ev.preventDefault()
    const elSearch = document.querySelector('.search-book-input')
    elSearch.value = gFilterBy = ''
    renderBooks()
}

function updateNotification(update) {
    const notification = document.querySelector('.notification')
    notification.innerHTML = update + ' successfully!'
    notification.style.display = 'block'
    setTimeout(() => { notification.style.display = 'none' }, 2000)
}