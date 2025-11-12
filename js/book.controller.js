'use strict'

var gFilterBy = ''
var gBookEditId = null

const gQueryOptions = {
    filterBy: { name: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 },
}

function onInit() {
    readQueryParams()
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
    setQueryParams()
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
    const elEditModal = document.querySelector('.book-edit-modal')
    const elSpanModal = document.querySelector('h2 span')
    elSpanModal.innerText = 'Edit'

    gBookEditId = id

    const elName = document.querySelector('.book-edit-modal input.book-edit-name')
    const elPrice = document.querySelector('.book-edit-modal input.book-edit-price')

    const book = getBookById(id)

    elName.value = book.name
    elPrice.value = book.price

    elEditModal.showModal()
    // const newPrice = +prompt('Change price')
    // updatePrice(id, newPrice)
    // renderBooks()
}

function onAddBook() {
    resetBookEditModal()
    gBookEditId = null
    const elEditModal = document.querySelector('.book-edit-modal')
    const elSpanModal = document.querySelector('h2 span')
    elSpanModal.innerText = 'Add'
    elEditModal.showModal()


    // const bookName = prompt('Choose name')
    // const bookPrice = +prompt('Choose price')
    // if (!bookName || !bookPrice) return alert('Cannot add blank title/price')
    // addBook(bookName, bookPrice)
    // renderBooks()
}

function onSaveBook(elForm){
    const elName = elForm.querySelector('.book-edit-modal input.book-edit-name')
    const elPrice = elForm.querySelector('.book-edit-modal input.book-edit-price')

    const name = elName.value
    const price = +elPrice.value

    if (!name || !price) return alert('Cannot add blank title/price')


    var book
    if (gBookEditId) {
        book = updateBook(gBookEditId, name, price)
    } else {
        book = addBook(name, price)
    }

    renderBooks()
}

function resetBookEditModal() {
    const elName = document.querySelector('.book-edit-modal input.book-edit-name')
    const elPrice = document.querySelector('.book-edit-modal input.book-edit-price')

    elName.value = ''
    elPrice.value = ''
}

function onCloseBookEditModal() {
    document.querySelector('.book-edit-modal').close()
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

function onChangePage(diff) {

    var nextPageIdx = gQueryOptions.page.idx + diff
    const totalPages = getTotalPagesCount(gQueryOptions)

    // if (nextPageIdx >= totalPages) return
    // if (nextPageIdx < 0) return
    if (nextPageIdx >= totalPages) nextPageIdx = 0 // returning to the first page
    if (nextPageIdx < 0) nextPageIdx = totalPages - 1 // forwarding to the last page

    gQueryOptions.page.idx = nextPageIdx
    document.querySelector('h3 .currPage').innerText = gQueryOptions.page.idx + 1

    renderBooks()
}

//* Query Params
function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('name', gQueryOptions.filterBy.name)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    if (gQueryOptions.sortBy.field) {
        queryParams.set('sortField', gQueryOptions.sortBy.field)
        queryParams.set('sortDir', gQueryOptions.sortBy.dir)
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        name: queryParams.get('name') || '',
        rating: queryParams.get('rating') || ''
    }

    if (queryParams.get('sortField')) {
        const field = queryParams.get('sortField')
        const dir = queryParams.get('sortDir') || 1

        gQueryOptions.sortBy.field = field
        gQueryOptions.sortBy.dir = dir
    }

    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }

    renderQueryParams()
}

function renderQueryParams() {
    document.querySelector('.search-book-input').value = gQueryOptions.filterBy.name
    document.querySelector('.sort-field').value = gQueryOptions.filterBy.rating

    const sortField = gQueryOptions.sortBy.field
    const sortDir = +gQueryOptions.sortBy.dir

    document.querySelector('.sort-by select').value = sortField || ''
    document.querySelector('.sort-by input').checked = sortDir === -1

    document.querySelector('.currPage').innerText = (gQueryOptions.page.idx || 0) + 1
}
