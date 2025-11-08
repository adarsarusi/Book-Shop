function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    const strHTMLs = books.map(book => `
        <tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td><button>Read</button>
            <button>Update</button>
            <button>Delete</button></td>
        </tr>
        `)

    const elTable = document.querySelector('.book-shop')
    elTable.innerHTML += strHTMLs.join('')
}