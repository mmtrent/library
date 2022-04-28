const container = document.querySelector('#container');

/*
const addBook = document.getElementById('addBook');
addBook.addEventListener('click', addBookToLibrary);
addBook.addEventListener('click', addBookToLibrary);
*/

//let myLibrary = [];

//test library
let myLibrary = [
    {
        "title": "Slaughterhouse Five",
        "author": "K. Vonnegut",
        "numPages": 240,
        "haveRead": true
    },
    {
        "title": "For Whom the Bell Tolls",
        "author": "E. Hemmingway",
        "numPages": 480,
        "haveRead": false
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "numPages": 208,
        "haveRead": true
    }
]

function Book(title, author, numPages, haveRead) { // Book object constructor
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

/*
function addBookToLibrary() {
    
    const title = prompt('Title of Book:');
    const author = prompt('Author of Book:');
    const numPages = prompt('Number of pages in Book:');
    const haveRead = prompt('Have you Read the Book? (Y/N)');


    test input
    const title = "Walden"
    const author = "Thoreau"
    const numPages = 455
    const haveRead = true
    

    const book = new Book(title, author, numPages, haveRead);
    myLibrary.push(book);
    displayBooks();
}
*/


function displayBooks() {
    container.innerText = '';
    for (let i = 0; i < myLibrary.length; i++) {
        createCard(i);
        } 
    setCheckListeners();
}

displayBooks();

function createCard (i) {
    const card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
        card.innerText = ('Title: ' + myLibrary[i].title + '\n' + 'Author: ' + myLibrary[i].author
                        + '\n' + 'Pages: ' + myLibrary[i].numPages  );
                        const readCheck = document.createElement('div');
        readCheck.classList.add('readCheck');
        card.appendChild(readCheck);
        readCheck.innerText = ("Have read: ")

        const readCheckmark = document.createElement("INPUT");
        readCheckmark.setAttribute("type", "checkbox");
        readCheckmark.setAttribute("id", "readCheckmark" + i);
        readCheck.appendChild(readCheckmark);
        if (myLibrary[i].haveRead == true) {
            document.getElementById('readCheckmark' + i).checked = true;
        }
};

function setCheckListeners() {
    for (let i = 0; i < myLibrary.length; i++) {
        eval("let readCheckmark" + i + " = document.querySelector('readCheckmark" + i + "')");
        eval("readCheckmark" + i).addEventListener('change', function() {
            if (this.checked) {
                console.log(`Checkbox ${i} is checked.`);
            } else {
                console.log(`Checkbox ${i} is not checked`);
            }
        });
    }
}