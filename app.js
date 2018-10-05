//Селекторы
// Для новых и прочитанных
const readedCol = document.querySelector('.readed');
const notReadedCol = document.querySelector('.not-readed');
const move = document.querySelector('.move');
const addBookButton = document.getElementById('add-book');
const remove = document.querySelector('.delete');

//евенты
function addEvents(){
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
    document.getElementById('book-name').value = '';
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
            document.querySelector('.delete').remove();
           }
      if (ul.contains('readed')) {
            notReadedCol.appendChild(li);
      }
      e.target.parentElement.parentElement.remove();

    }
  }

//Перемещение книги в прочитанное
function deleteBook(e) {
  //Проверяем есть ли класс у элемента по которому кликнули
  if(e.target.classList.contains('delete')){
    e.target.parentElement.parentElement.remove();
  }
}

function getStorage() {

}
