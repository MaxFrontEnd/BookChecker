//Селекторы
// Для новых и прочитанных
const readedCol = document.querySelector('.readed');
const notReadedCol = document.querySelector('.not-readed');
const move = document.querySelector('.move');
const addBookButton = document.getElementById('add-book');
const remove = document.querySelector('.delete');
const statusRow = document.querySelector('.status');

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
function statusDisplay(status) {
  const html = document.createElement('span');
  const text = document.createTextNode(status);
  html.appendChild(text);
  // Не добавлять елемент, елси уже есть такой
  if(!statusRow.innerText){
    statusRow.appendChild(html);
  }
    setTimeout(() => {

      html.remove();
    }, 3000);



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
    statusDisplay("Книга добавлена");
  } else {
    // добавить сообщение о необходимости заполнить поле
    alert("Добавьте название книги");
  }
}

function arrayOfTitles();
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
            removeBookFromStorage(bookName, 'books');
            document.querySelector('.delete').remove();
            statusDisplay('Книга добавлена в прочитанное');
           }
      if (ul.contains('readed')) {
            notReadedCol.appendChild(li);
            setBookToStorage(bookName);
            removeBookFromStorage(bookName, 'readed');
            statusDisplay('Книга возвращена из прочитанного');
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
  exemplar = {};
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
    exemplar.title = book;
    books.push(exemplar);
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  let arrOftitles = [];
  books.forEach(exemplar => {
    arrOftitles.push(exemplar.title);
  });
  if(!arrOftitles.includes(book)){
    exemplar = {};
    exemplar.title = book;
    books.push(exemplar);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

  // если экземпляр уже есть, не добавляем новый
  // if(!books.includes(book.trim())){
  //   books.push(book);
  //   localStorage.setItem('books', JSON.stringify(books));
  // }


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

// Забрать из хранилища непрочитанные (рефакт)
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
 // Забрать из локального хранилища прочитанные книги
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
//
// // Удаляем из локального хранилища непрочитанные {рефакт}
// function removeBookFromStorage(removeBook, storage) {
//   books = JSON.parse(localStorage.getItem(storage));
//   books.forEach((book, index) => {
//     if (book.trim() === removeBook.trim()) {
//       books.splice(index, 1);
//       localStorage.setItem(storage, JSON.stringify(books));
//     }
//   });
// }
