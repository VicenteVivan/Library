let libro = new Book("Title", "Author", 350, 1);

let myLibrary = [libro, libro, libro, libro, libro, libro];

function Book(title, author, pages, read = 0) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    myLibrary.forEach((book) => {
        //Creating Card Structure Elements
        let card = document.createElement("div");
        card.classList = "book-card";
        let title = document.createElement("h1");
        let author = document.createElement("h3");
        let pages = document.createElement("span");
        //Adding Content to the Elements
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = `0/${book.pages}`;
        //Putting the Elements Together
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        //Adding the Card to the Page
        document.getElementById("books").appendChild(card);
    });
}
