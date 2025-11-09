'use strict'

var gFilterBy = ''

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks(gFilterBy)
    const tableHeader =
        `<tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>`
    const strHTMLs = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td><button class="btn1" onclick="onShowDetails('${book.name}')">Read</button>
            <button class="btn2" onclick="onUpdateBook('${book.name}')">Update</button>
            <button class="btn3" onclick="onRemoveBook('${book.name}')">Delete</button></td>
        </tr>
        `)

    const elTable = document.querySelector('.book-shop')
    elTable.innerHTML = tableHeader + strHTMLs.join('')
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

function onShowDetails(name){
    const elBookDetailsModal = document.querySelector('dialog.book-details-modal')
    const elContent = elBookDetailsModal.querySelector('.content')
    const book = getBookByName(name)
    elContent.innerText = JSON.stringify(book, null, 4)
    elBookDetailsModal.showModal()
}

function filterByInput(input){
    // ev.preventDefault()
    gFilterBy = input
    renderBooks()
}

function clearSearch(ev){
    ev.preventDefault()
    const elSearch = document.querySelector('.search-book-input')
    elSearch.value = gFilterBy = ''
    renderBooks()
}