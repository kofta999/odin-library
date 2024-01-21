const myLibrary = [];
const cards = document.querySelector("#cards");
const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector("#new-book");

newBookButton.addEventListener("click", (e) => {
  dialog.showModal();
});

dialog.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = new Book(formData.get("title"), formData.get("isRead"));
  addBookToLibrary(book);
  addBookToUI(book);
  dialog.close();
  e.target.reset();
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

myLibrary.forEach((book, index) => addBookToUI(book, index));

function addBookToUI(book, index = myLibrary.length) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const removeButton = document.createElement("button");
  const isReadButton = document.createElement("button");

  isReadButton.textContent = book.isRead ? "Read" : "Not Read";
  isReadButton.classList.add("btn", "read-btn");

  removeButton.textContent = "Remove";
  removeButton.classList.add("btn", "remove-btn");

  bookTitle.textContent = book.title;

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(isReadButton);
  bookCard.appendChild(removeButton);

  isReadButton.addEventListener("click", (e) => {
    book.markAsRead();
    e.target.textContent = book.isRead ? "Read" : "Not Read";
  });

  removeButton.addEventListener("click", () => {
    removeBookFromLibrary(index);
    removeBookFromUI(bookCard);
  });

  bookCard.classList.add("card");
  cards.appendChild(bookCard);
}

function Book(title, isRead) {
  this.title = title;
  this.isRead = isRead;
}

Book.prototype.markAsRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function removeBookFromUI(card) {
  card.remove();
}
