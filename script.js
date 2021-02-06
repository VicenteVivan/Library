function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

randomAuthors = [
    "William Shakespeare",
    "Emily Dickinson",
    "H. P. Lovecraft",
    "Arthur Conan Doyle",
    "Leo Tolstoy",
    "Edgar Allan Poe",
    "Robert Ervin Howard",
    "Rabindranath Tagore",
    "Rudyard Kipling",
    "Seneca",
    "John Donne",
    "Sarah Williams",
    "Oscar Wilde",
    "Catullus",
    "Alfred Tennyson",
    "William Blake",
    "Charles Dickens",
    "John Keats",
    "Theodor Herzl",
    "Percy Bysshe Shelley",
    "Ernest Hemingway",
    "Barack Obama",
    "Anton Chekhov",
    "Henry Wadsworth Longfellow",
    "Arthur Schopenhauer",
    "Jacob De Haas",
    "George Gordon Byron",
    "Jack London",
    "Robert Frost",
    "Abraham Lincoln",
    "O. Henry",
    "Ovid",
    "Robert Louis Stevenson",
    "John Masefield",
    "James Joyce",
    "Clark Ashton Smith",
    "Aristotle",
    "William Wordsworth",
    "Jane Austen",
    "Niccolò Machiavelli",
    "Lewis Carroll",
    "Robert Burns",
    "Edgar Rice Burroughs",
    "Plato",
    "John Milton",
    "Ralph Waldo Emerson",
    "Margaret Thatcher",
    "Sylvie d'Avigdor",
    "Marcus Tullius Cicero",
    "Banjo Paterson",
    "Woodrow Wilson",
    "Walt Whitman",
    "Theodore Roosevelt",
    "Agatha Christie",
    "Ambrose Bierce",
    "Nikola Tesla",
    "Franz Kafka",
];

randomTitles = [
    "Doctor Of The Curse",
    "Enemy Of The Nation",
    "Priests Of The Void",
    "Mice Of The Day",
    "Bandits And Strangers",
    "Heroes And Pilots",
    "Origin Of Dusk",
    "Murder Of Freedom",
    "Shelter At My Destiny",
    "Vanish In The Night",
    "Creator With Gold",
    "Duke Of Wood",
    "Robots Of Glory",
    "Humans Of The Land",
    "Men And Serpents",
    "Fish And Heirs",
    "Love Of Nightmares",
    "Ascension Of The World",
    "Hiding My Nightmares",
    "Trust My Past",
    "King Of Nightmares",
    "Foe With Immortality",
    "Spiders Of The Ocean",
    "Kings Of Wind",
    "Trees And Priests",
    "Agents And Pilots",
    "Strife Of Utopia",
    "Obliteration With Money",
    "Separated By The West",
    "Whispers In My Dreams",
    "Horse With Sins",
    "Witch With Strength",
    "Heirs Of The Frontline",
    "Warriors Of The Lost Ones",
    "Cats And Enemies",
    "Slaves And Guardians",
    "Love Of The South",
    "Birth Of Next Year",
    "Punished By My Past",
    "Force Of My Wife",
    "Warrior Of Destruction",
    "Lion Of Insanity",
    "Giants Of The Great",
    "Defenders Of Fortune",
    "Enemies And Phantoms",
    "Children And Girls",
    "Defeat Of Rainbows",
    "Argument With A Goal",
    "Temptations In The Commander",
    "Praise The Ashes",
];

let myLibrary = [];
if (localStorage.getItem("myLibrary") != null) {
    lastLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    lastLibrary.forEach((element) => {
        myLibrary.push(new Book(element.title, element.author, element.pages, element.read));
    });
    addBookToLibrary();
}

function Book(title, author, pages, read = false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
};

function addBookToLibrary() {
    $("books").innerHTML = "";
    myLibrary.forEach((book, index) => {
        //Creating Card Structure Elements
        let card = document.createElement("div");
        card.classList = "book-card";
        let title = document.createElement("h2");
        let divider = document.createElement("hr");
        let author = document.createElement("h6");
        author.classList.add("author");
        let footer = document.createElement("div");
        footer.classList = "cardFooter";
        let pages = document.createElement("span");
        let readStatus = document.createElement("span");
        if (book.read) {
            readStatus.innerText = "Finished";
            readStatus.classList.add("badge", "bg-success", "read-status");
        } else {
            readStatus.innerText = "Unfinished";
            readStatus.classList.add("badge", "bg-secondary", "read-status");
        }
        //Adding Content to the Elements
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = `${book.pages} pages`;
        //Putting the Elements Together
        card.innerHTML += `<i class="fa fa-trash remove-book"" id=${index}></i>`;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(readStatus);
        footer.appendChild(pages);
        card.appendChild(footer);
        //Adding the Card to the Page
        document.getElementById("books").appendChild(card);
        //Remove Book Button
        $(String(index)).addEventListener("click", (event) => {
            myLibrary.splice(Number(event.target.id), 1);
            localStorage.clear();
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
            addBookToLibrary();
        });
        readStatus.addEventListener("click", (event) => {
            book.toggleRead();
            addBookToLibrary();
        });
        //Save in Local Storage
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });
}

function $(id) {
    return document.getElementById(id);
}

//Open and Close Form to Add Book

$("add-book").addEventListener("click", (event) => {
    $("form").style.display = "initial";
    $("library").style.gridTemplateColumns = "auto 400px";
});

$("close-form").addEventListener("click", (event) => {
    $("form").style.display = "none";
    $("library").style.gridTemplateColumns = "100% 0";
});

//Random Book
$("random").addEventListener("click", (event) => {
    $("title").value = randomTitles[randInt(0, randomTitles.length)];
    $("author").value = randomAuthors[randInt(0, randomAuthors.length)];
    $("pages").value = randInt(0, 1500);
});

//Create New Book Object from Form

$("add").addEventListener("click", (event) => {
    let title = $("title");
    let author = $("author");
    let pages = $("pages");
    let read = $("read");
    if (title.checkValidity() && author.checkValidity() && pages.checkValidity()) {
        newBook = new Book(title.value, author.value, pages.value, read.checked);
        title.value = "";
        author.value = "";
        pages.value = "";
        myLibrary.unshift(newBook);
        addBookToLibrary();
    }
});
