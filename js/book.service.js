
const gBooks = [
    {
        name: 'The Adventures of Lori Ipsi',
        price: 120
    },
    {
        name: 'World Atlas',
        price: 300
    },
    {
        name: 'Zorba the Greek',
        price: 87
    }]


function getBooks(){
    return gBooks
}

function removeBook(name){
    const bookToRemove = gBooks.findIndex(book => book.name === name)
    gBooks.splice(bookToRemove, 1) 
}