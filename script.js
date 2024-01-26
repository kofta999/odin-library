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
  book.addToLibrary();
  book.addToUI();
  dialog.close();
  e.target.reset();
});

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

class Book {
  #bookCard;

  constructor(title, isRead) {
    this.title = title;
    this.isRead = isRead;
  }

  markAsRead() {
    this.isRead = !this.isRead;
  }

  addToLibrary() {
    myLibrary.push(this);
  }

  removeFromLibrary() {
    const idx = myLibrary.findIndex((v) => v === this);
    myLibrary.splice(idx, 1);
  }

  addToUI() {
    this.#bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const removeButton = document.createElement("button");
    const isReadButton = document.createElement("button");

    isReadButton.textContent = this.isRead ? "Read" : "Not Read";
    isReadButton.classList.add("btn", "read-btn");

    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "remove-btn");

    bookTitle.textContent = this.title;

    this.#bookCard.appendChild(bookTitle);
    this.#bookCard.appendChild(isReadButton);
    this.#bookCard.appendChild(removeButton);

    isReadButton.addEventListener("click", (e) => {
      this.markAsRead();
      e.target.textContent = this.isRead ? "Read" : "Not Read";
    });

    removeButton.addEventListener("click", () => {
      this.removeFromLibrary();
      this.removeFromUI();
    });

    this.#bookCard.classList.add("card");
    cards.appendChild(this.#bookCard);
  }

  removeFromUI() {
    this.#bookCard.remove();
  }
}
