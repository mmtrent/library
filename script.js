class Book {
    constructor(title, author, numPages, haveRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }
}

addBookToLibrary = () => {
    const title = document.getElementsByName("title")[0].value
    const author = document.getElementsByName("author")[0].value
    const numPages = document.getElementsByName("numPages")[0].value
    const haveRead = false
    const book = new Book(title, author, numPages, haveRead);
    myLibrary.push(book);
    displayBooks();
}

let myLibrary = [];

// User Interface

const openForm = () => { // Display form to add books to library when 'New Book' is clicked
    document.getElementById("addBookForm").style.display = "block";
    container.classList.add('is-blurred'); // Blur background to bring focus to popup form
    addBook.classList.add('is-blurred');
}

const closeForm = () => { // Close popup form and remove bluring from main body
    document.getElementById("addBookForm").style.display = "none";
    container.classList.remove('is-blurred');
    addBook.classList.remove('is-blurred');
}

const displayBooks = () => { // Reset view of books after adding a new book
    container.innerText = '';
    for (let i = 0; i < myLibrary.length; i++) {
        createCard(i);
        }

    setCheckListeners(); // Add new 'Have Read' listeners for additional books
    setDeleteListeners(); // Add new delete buttons for each additional book
}

const createCard = (i) => {
    // Create HTML card element
    const card = document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);

    // Add book information to card
    card.innerText = ('Title: ' + myLibrary[i].title + '\n' + 'Author: ' + myLibrary[i].author
                    + '\n' + 'Pages: ' + myLibrary[i].numPages  );
    
    // Create check box to mark if book has been read or not
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

    // Create delete button to remove book object from library array
    const deleteButton = document.createElement("INPUT");
    deleteButton.classList.add('deleteButton');
    deleteButton.classList.add('filter-white');
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "deleteButton" + i);
    deleteButton.setAttribute("value", "Delete Book");
    card.appendChild(deleteButton);
};

const setCheckListeners = () => { // Add listeners for 'Have Read' check boxes
    for (let i = 0; i < myLibrary.length; i++) {
        eval("let readCheckmark" + i + " = document.querySelector('readCheckmark" + i + "')");
        eval("readCheckmark" + i).addEventListener('change', function() {
            if (this.checked) {
                myLibrary[i].haveRead = true;
            } else {
                myLibrary[i].haveRead = false;
            }
        });
    }
}

const  setDeleteListeners = () => {
    for (let i = 0; i < myLibrary.length; i++) {
        eval("let deleteButton" + i + " = document.querySelector('deleteButton" + i + "')");
        eval("deleteButton" + i).addEventListener('click', function() {
            // delete book object from myLibrary array
            myLibrary.splice(i, 1);
            displayBooks();
        })
    }
}

const container = document.querySelector('#container'); // HTML Body container
const addBook = document.getElementById('addBook'); // New book button
addBook.addEventListener('click', openForm); // Open form to add new book to library

const saveButton = document.getElementById('save'); // Save button on popup form
saveButton.addEventListener('click', addBookToLibrary); // Call addBook function when save is clicked
saveButton.addEventListener('click', closeForm); // Close popup form after book is saved

displayBooks();