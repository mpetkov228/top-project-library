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

const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('.newBookBtn');

newBookBtn.addEventListener('click', () => {
    toggleNewBookBtn();
    toggleForm();
});

function toggleNewBookBtn() {
    const currentDisplay = newBookBtn.style.display;

    if (currentDisplay == 'none') {
        newBookBtn.style.display = 'block';
    } else {
        newBookBtn.style.display = 'none';
    }
}

function toggleForm() {
    const currentDisplay = form.style.display;
    
    if (currentDisplay == 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateTable();
}

function createTableRow(book) {
    const tr = document.createElement('tr');
    
    const tdTitle = document.createElement('td');
    tdTitle.textContent = book.title;
    tr.appendChild(tdTitle);

    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.author;
    tr.appendChild(tdAuthor);

    const tdPages = document.createElement('td');
    tdPages.textContent = book.pages;
    tr.appendChild(tdPages);

    const tdRead = document.createElement('td');
    tdRead.textContent = book.read;
    tr.appendChild(tdRead);

    return tr;
}

function updateTable() {
    tbody.replaceChildren();
    
    for (let book of myLibrary) {
        const tr = createTableRow(book);
        tbody.appendChild(tr);
    }
}

updateTable();