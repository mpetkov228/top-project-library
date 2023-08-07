let myLibrary = [
    new Book('War and Peace', 'Leo Tolstoy', 1225, false),
    new Book('1984', 'George Orwell', 328, true),
    new Book('Of Mice and Men', 'John Steinbeck', 107, false)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read ? 'read.' : 'not read yet.'}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}