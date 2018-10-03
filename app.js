//Селекторы
// Для новых и прочитанных
const readedCol = document.querySelector('.readed');
const notReadedCol = document.querySelector('.not-readed');
const move = document.querySelector('.move');
const addBookButton = document.getElementById('add-book');
//const bookName = document.getElementById('book-name').value
//console.log(addBookButton);
const ul = document.querySelector('.not-readed');

function addBook(e) {
  //Получаем значение из поля ввода
  const bookName = document.getElementById('book-name').value;
  //Элемент с новой книгой
  const li = document.createElement('li');
  //Добавляем класс к элементу
  li.className = 'collection-item';
  //Добавляем содержимое
  li.innerHTML = `${bookName}
    <a href="#" class=secondary-content>
    <i class="material-icons move right">Move</i></a>
    <a href="#" class="secondary-content">
    <i class="material-icons delete right">Delete</i></a>`
  // Добавляем дочерний элемент к списку
  notReadedCol.appendChild(li);
}

addBookButton.addEventListener('click', addBook)
//Удаление книги из списка
function moveBook(e) {
    //Проверяем есть ли класс у элемента по которому кликнули
    if(e.target.classList.contains('move')){
      const bookName = e.target.parentElement.parentElement.childNodes[0].textContent;
      e.target.parentElement.parentElement.remove();
      const li = document.createElement('li');
      //Добавляем класс к элементу
      li.className = 'collection-item';
      //Добавляем содержимое для прочитанных книг
      li.innerHTML = `${bookName}
        <a href="#" class="secondary-content">
        <i class="material-icons return right">Return</i></a>`
      // Добавляем дочерний элемент к списку
      readedCol.appendChild(li);
    }
  }

notReadedCol.addEventListener('click', moveBook);
//Перемещение книги в прочитанное
function deleteBook() {
  // Получаем родительский элементу

}

function returnBook() {

}
