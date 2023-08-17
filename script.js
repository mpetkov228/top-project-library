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

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readTrueInput = document.getElementById('true');
const readFalseInput = document.getElementById('false');
const cards = document.querySelector('.cards');

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

cards.addEventListener('click', (event) => {
    if (event.target.className != 'remove-btn') {
        return;
    }

    const card = event.target.parentElement;
    const index = card.getAttribute('data-index');
    removeBook(index);
});
cards.addEventListener('click', (event) => {
    if (event.target.className != 'read-btn' && event.target.className != 'not-read-btn') {
        return;
    }

    const card = event.target.parentElement;
    const index = card.getAttribute('data-index');
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
    
    if (currentDisplay == 'flex') {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
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

function updateTable() {
    cards.replaceChildren();

    for (let i = 0; i < myLibrary.length; i++) {
        const card = createCard(myLibrary[i]);
        card.setAttribute('data-index', i);
        cards.appendChild(card);
    }
    
}

function createCard(book) {
    const div = createElement('div', '', 'card');
    const title = createElement('p', book.title);
    const author = createElement('p', book.author);
    const pages = createElement('p', `${book.pages} pages`);

    const readBtnContent = book.read ? 'Read' : 'Not read';
    const readBtnClass = book.read ? 'read-btn' : 'not-read-btn';
    const readBtn = createElement('button', readBtnContent, readBtnClass);

    const removeBtn = createElement('button', 'Remove', 'remove-btn');

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(readBtn);
    div.appendChild(removeBtn);

    return div;
}

function createElement(type, content, cssClass) {
    const element = document.createElement(type);
    element.textContent = content;
    if (cssClass) {
        element.className = cssClass;
    }

    return element;
}

updateTable();