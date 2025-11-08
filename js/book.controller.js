function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
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
            <td><button>Read</button>
            <button>Update</button>
            <button onclick="onRemoveBook('${book.name}')">Delete</button></td>
        </tr>
        `)

    const elTable = document.querySelector('.book-shop')
    elTable.innerHTML = tableHeader + strHTMLs.join('')
}


function onRemoveBook(name) {
    removeBook(name)
    renderBooks()
}