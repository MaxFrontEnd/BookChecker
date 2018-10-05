//Селекторы
// Для новых и прочитанных
const readedCol = document.querySelector('.readed');
const notReadedCol = document.querySelector('.not-readed');
const move = document.querySelector('.move');
const addBookButton = document.getElementById('add-book');
const remove = document.querySelector('.delete');

//евенты
function addEvents(){
  document.addEventListener('DOMContentLoaded', getBooksFromStorage);
  document.addEventListener('DOMContentLoaded', getReadedFromStorage);

  // Добавить книгу в непрочитанное
  addBookButton.addEventListener('click', addBook)
  //Книгу в прочитанное
  notReadedCol.addEventListener('click', moveBook);
  notReadedCol.addEventListener('click', deleteBook);
  //Книгу в не прочитанное
  readedCol.addEventListener('click', moveBook);


}

addEvents();

//const bookName = document.getElementById('book-name').value
//console.log(addBookButton);
const ul = document.querySelector('.not-readed');

function formHtml(element, name) {
  //Добавляем содержимое
  element.innerHTML = `${name}
    <a href="#" class=secondary-content>
    <i class="material-icons move right">Переместить</i></a>
    <a href="#" class="secondary-content">
    <i class="material-icons delete right">Удалить</i></a>`
}
// отображает статус при удалении или добавлении книги
function statusDisplay(status, className) {
  //const html = `<div class={$className}>{$status}</div>`;
  const html = document.createElement('div');
  html.classList = className;
  const nav = document.querySelector('.teal');
  const container = document.querySelector('.container');
  
}
function addBook(e) {
  //Получаем значение из поля ввода
  const bookName = document.getElementById('book-name').value;
  //Элемент с новой книгой
  const li = document.createElement('li');
  //Добавляем класс к элементу
  if(bookName) {
    li.className = 'collection-item';
    formHtml(li, bookName);
    // Добавляем дочерний элемент к списку
    notReadedCol.appendChild(li);
    setBookToStorage(bookName);
    document.getElementById('book-name').value = '';
    statusDisplay("Книга добавлена", 'positive-status');
  } else {
    // добавить сообщение о необходимости заполнить поле
    alert("Добавте название книги");
  }

}

//Удаление книги из списка
function moveBook(e) {
    //Проверяем есть ли класс у элемента по которому кликнули
    if(e.target.classList.contains('move')){
      const bookName = e.target.parentElement.
      parentElement.childNodes[0].textContent.trim();
      const ul = e.target.parentElement.parentElement.parentElement.classList;
      // Добавляем дочерний элемент к списку
      const li = document.createElement('li');
        li.className = 'collection-item';
        formHtml(li, bookName);
      if(ul.contains('not-readed')) {
            readedCol.appendChild(li);
            setReadedToStorage(bookName);
            removeBookFromStorage(bookName);
            document.querySelector('.delete').remove();
           }
      if (ul.contains('readed')) {
            notReadedCol.appendChild(li);
            setBookToStorage(bookName);
            removeReadedFromStorage(bookName);
      }
      e.target.parentElement.parentElement.remove();

    }
  }

//Перемещение книги в прочитанное
function deleteBook(e) {
  //Проверяем есть ли класс у элемента по которому кликнули
  if(e.target.classList.contains('delete')){
    const bookName = e.target.parentElement.
    parentElement.childNodes[0].textContent.trim();
    e.target.parentElement.parentElement.remove();
    removeBookFromStorage(bookName);
  }
}

//Добавляем книгу в локальное хранилище
function setBookToStorage(book) {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  // если экземпляр уже есть, не добавляем новый
  if(!books.includes(book.trim())){
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Добавить книгу в хранилище прочитанных
function setReadedToStorage(book) {
  let readed;
  if(localStorage.getItem('readed') === null) {
    readed = [];
  } else {
    readed = JSON.parse(localStorage.getItem('readed'));
  }
  //Если книга есть то не создаем еще один экземпляр
  if(!readed.includes(book.trim())){
    readed.push(book);
    localStorage.setItem('readed', JSON.stringify(readed));
  }
}

function getBooksFromStorage() {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];

  } else {
    books = JSON.parse(localStorage.getItem('books'));
    books.forEach(book => {
      //Элемент с новой книгой
      const li = document.createElement('li');
      //Добавляем класс к элементу
        li.className = 'collection-item';
        //Отображаем каждую книгу из списка книг
        formHtml(li, book);
        // Добавляем дочерний элемент к списку
        notReadedCol.appendChild(li);
        //setStorgae(bookName);
    });
    //console.log(books);
  }

}

function getReadedFromStorage() {
  let readed;
  if(localStorage.getItem('readed') === null) {
    readed = [];

  } else {
    readed = JSON.parse(localStorage.getItem('readed'));
    readed.forEach(book => {
      //Элемент с новой книгой
      const li = document.createElement('li');
      //Добавляем класс к элементу
        li.className = 'collection-item';
        //Отображаем каждую книгу из списка книг
        formHtml(li, book);
        // Добавляем дочерний элемент к списку
        readedCol.appendChild(li);
        //setStorgae(bookName);
        document.querySelector('.delete').remove();
    });
    //console.log(books);
  }

}

// Удаляем из локального хранилища
function removeBookFromStorage(removeBook) {
  books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book, index) => {
    if (book.trim() === removeBook.trim()) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  });
}

// Удаляем из локального хранилища
function removeReadedFromStorage(removeBook) {
  readed = JSON.parse(localStorage.getItem('readed'));
  readed.forEach((book, index) => {
    if (book.trim() === removeBook.trim()) {
      readed.splice(index, 1);
      localStorage.setItem('readed', JSON.stringify(readed));
    }
  });
}
