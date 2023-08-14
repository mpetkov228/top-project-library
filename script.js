class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read.' : 'not read yet.'}`;
    }

    toggleRead = () => {
        this.read = !this.read;
    }
}

let myLibrary = [
    new Book('War and Peace', 'Leo Tolstoy', 1225, false),
    new Book('1984', 'George Orwell', 328, true),
    new Book('Of Mice and Men', 'John Steinbeck', 107, false)
];

const tbody = document.querySelector('tbody');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readTrueInput = document.getElementById('true');
const readFalseInput = document.getElementById('false');

const container = document.querySelector('.container');
const form = document.querySelector('form');
const newBookBtn = document.querySelector('.newBookBtn');

newBookBtn.addEventListener('click', () => {
    toggleNewBookBtn();
    toggleForm();
});

form.addEventListener('submit', onSubmit);
form.addEventListener('click', (event) => {
    if (event.target.className != 'backBtn') {
        return;
    }

    toggleForm();
    toggleNewBookBtn();
});

tbody.addEventListener('click', (event) => {
    if (event.target.className != 'removeBtn') {
        return;
    }

    const tr = event.target.parentElement.parentElement;
    const index = tr.getAttribute('data-index');
    removeBook(index);
});
tbody.addEventListener('click', (event) => {
    if (event.target.className != 'editBtn') {
        return;
    }

    const tr = event.target.parentElement.parentElement;
    const index = tr.getAttribute('data-index');
    editBookRead(index);
});

function onSubmit(event) {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    let read;
    
    if (readTrueInput.checked) {
        read = true;
    } else if (readFalseInput.checked) {
        read = false;
    }
    
    const book = new Book(title, author, pages, read);

    event.target.reset();

    addBookToLibrary(book);
    toggleNewBookBtn();
    toggleForm();
}

function toggleNewBookBtn() {
    const currentDisplay = newBookBtn.style.display;

    if (currentDisplay == 'none') {
        newBookBtn.style.display = 'block';
    } else {
        newBookBtn.style.display = 'none';
    }
}

function toggleForm() {
    const currentDisplay = container.style.display;
    
    if (currentDisplay == 'block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateTable();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    updateTable();
}

function editBookRead(index) {
    myLibrary[index].toggleRead();
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
    const span = document.createElement('span');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'editBtn';
    span.textContent = book.read ? 'Yes' : 'No';
    tdRead.appendChild(span);
    tdRead.appendChild(editBtn);
    tr.appendChild(tdRead);

    const tdRemove = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'removeBtn';
    tdRemove.appendChild(removeBtn);
    tr.appendChild(tdRemove);

    return tr;
}

function updateTable() {
    tbody.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const tr = createTableRow(myLibrary[i]);
        tr.setAttribute('data-index', i);
        tbody.appendChild(tr);
    }
    
}

updateTable();