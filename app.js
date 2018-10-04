//Селекторы
// Для новых и прочитанных
const readedCol = document.querySelector('.readed');
const notReadedCol = document.querySelector('.not-readed');
const move = document.querySelector('.move');
const addBookButton = document.getElementById('add-book');


//евенты
function addEvents(){
  // Добавить книгу в непрочитанное
  addBookButton.addEventListener('click', addBook)
  //Книгу в прочитанное
  notReadedCol.addEventListener('click', moveBook);
  //Книгу в не прочитанное
  readedCol.addEventListener('click', moveBook);
}

addEvents();


//const bookName = document.getElementById('book-name').value
//console.log(addBookButton);
const ul = document.querySelector('.not-readed');

function addBook(e) {
  //Получаем значение из поля ввода
  const bookName = document.getElementById('book-name').value;
  //Элемент с новой книгой
  const li = document.createElement('li');
  //Добавляем класс к элементу
  if(bookName){
    li.className = 'collection-item';
    //Добавляем содержимое
    li.innerHTML = `${bookName}
      <a href="#" class=secondary-content>
      <i class="material-icons move right">Переместить</i></a>
      <a href="#" class="secondary-content">
      <i class="material-icons delete right">Удалить</i></a>`
    // Добавляем дочерний элемент к списку
    notReadedCol.appendChild(li);
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
      parentElement.childNodes[0].textContent;
      // Добавляем дочерний элемент к списку
      if(e.target.parentElement.parentElement.parentElement.classList
        .contains('not-readed')) {
          const li = document.createElement('li');
          li.className = 'collection-item';
            li.innerHTML = `${bookName}
              <a href="#" class="secondary-content">
              <i class="material-icons move right">Переместить</i></a>`
            readedCol.appendChild(li);
           }
      if (e.target.parentElement.parentElement.parentElement.classList
        .contains('readed')) {
          const li = document.createElement('li');
            li.className = 'collection-item';
            li.innerHTML = `${bookName}
              <a href="#" class="secondary-content">
              <i class="material-icons move right">Переместить</i></a>
              <a href="#" class="secondary-content">
              <i class="material-icons delete right">Удалить</i></a>`
            notReadedCol.appendChild(li);
      }
      e.target.parentElement.parentElement.remove();

    }
  }

//Перемещение книги в прочитанное
function deleteBook() {
  // Получаем родительский элементу

}
