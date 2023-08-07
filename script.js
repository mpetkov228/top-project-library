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
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readTrueInput = document.getElementById('true');
const readFalseInput = document.getElementById('false');

const form = document.querySelector('form');
const newBookBtn = document.querySelector('.newBookBtn');

newBookBtn.addEventListener('click', () => {
    toggleNewBookBtn();
    toggleForm();
});

form.addEventListener('submit', (event) => {
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

    addBookToLibrary(book);
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