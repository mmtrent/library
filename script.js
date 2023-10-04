const Library = (() => { // Library Module

    let myLibrary = []; // Array to store Book classes

    class Book {
        constructor(title, author, numPages, haveRead) {
            this.title = title;
            this.author = author;
            this.numPages = numPages;
            this.haveRead = haveRead;
        }
    }

    addBookToLibrary = (title, author, numPages) => {
        const haveRead = false;
        const book = new Book (title, author, numPages, haveRead);
        myLibrary.push(book);
    }

    return {myLibrary, addBookToLibrary};
})();

// User Interface

const Interface = (() => { // Interface Module

    const openForm = () => { // Display form to add books to library when 'New Book' is clicked
        document.getElementById("addBookForm").style.display = "block";
        container.classList.add('is-blurred'); // Blur background to bring focus to popup form
        addBook.classList.add('is-blurred'); // Blur 'Add Book' button as well
    }

    const closeForm = () => { // Close popup form and remove blurring from main body
        document.getElementById("addBookForm").style.display = "none";
        container.classList.remove('is-blurred');
        addBook.classList.remove('is-blurred');
    }

    const displayBooks = () => { // Reset view of books after adding a new book
        container.innerText = '';
        for (let i = 0; i < Library.myLibrary.length; i++) {
            createCard(i);
            }
    
        setCheckListeners(); // Add new 'Have Read' listeners for additional books
        setDeleteListeners(); // Add new delete buttons for each additional book
    
        const saveButton = document.getElementById('save'); // Save button on popup form
        saveButton.addEventListener('click', saveBook); 
        saveButton.addEventListener('click', closeForm); // Close popup form after book is saved
    }

    const createCard = (i) => {
        // Create HTML card element
        const card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
    
        // Add book information to card
        card.innerText = ('Title: ' + Library.myLibrary[i].title + '\n' + 'Author: ' + Library.myLibrary[i].author
                        + '\n' + 'Pages: ' + Library.myLibrary[i].numPages  );
        
        // Create check box to mark if book has been read or not
        const readCheck = document.createElement('div');
        readCheck.classList.add('readCheck');
        card.appendChild(readCheck);
        readCheck.innerText = ("Have read: ")
        const readCheckmark = document.createElement("INPUT");
        readCheckmark.setAttribute("type", "checkbox");
        readCheckmark.setAttribute("id", "readCheckmark" + i);
        readCheck.appendChild(readCheckmark);
        if (Library.myLibrary[i].haveRead == true) {
            document.getElementById('readCheckmark' + i).checked = true;
        }
    
        // Create delete button to remove book object from library array and add classes for styling
        const deleteButton = document.createElement("INPUT");
        deleteButton.classList.add('deleteButton');
        deleteButton.classList.add('filter-white');
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("id", "deleteButton" + i);
        deleteButton.setAttribute("value", "Delete Book");
        card.appendChild(deleteButton);
    }

    const setCheckListeners = () => { // Add listeners for 'Have Read' check boxes
        for (let i = 0; i < Library.myLibrary.length; i++) {
            eval("let readCheckmark" + i + " = document.querySelector('readCheckmark" + i + "')"); // Iterate through library array and create "readCheckmark" variables for each book
            eval("readCheckmark" + i).addEventListener('change', function() { // Add event listeners to each book to listen for a change to the checkbox
                if (this.checked) { // If checkbox changes to 'checked,' update the library array to have the 'haveRead' field changed to true
                    Library.myLibrary[i].haveRead = true;
                } else { // If checkbox changes to 'unchecked,' update the library array to have the 'haveRead' field changed to false
                    Library.myLibrary[i].haveRead = false;
                }
            });
        }
    }

    const  setDeleteListeners = () => {
        for (let i = 0; i < Library.myLibrary.length; i++) {
            eval("let deleteButton" + i + " = document.querySelector('deleteButton" + i + "')"); // Iterate through library and create "deleteButton" variables for each book
            eval("deleteButton" + i).addEventListener('click', function() { // Add event listeners for each delete button and book
                // delete book object from Library.myLibrary array
                Library.myLibrary.splice(i, 1); // Remove entry from library array at i'th index
                displayBooks(); // Reset book display with newly modified array
            })
        }
    }

    const container = document.querySelector('#container'); // HTML Body container
    const addBook = document.getElementById('addBook'); // New book button
    addBook.addEventListener('click', openForm); // Open form to add new book to library

    const saveBook = () => {
        let title = document.getElementsByName("title")[0].value
        let author = document.getElementsByName("author")[0].value
        let numPages = document.getElementsByName("numPages")[0].value
        Library.addBookToLibrary(title, author, numPages);
        displayBooks();
    }

    return {
        openForm,
        closeForm,
        displayBooks,
        createCard,
        setCheckListeners,
        setDeleteListeners,
        saveBook,
    }
})();

Interface.displayBooks();