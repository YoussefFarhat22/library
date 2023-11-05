const myLibrary = [];

function Book(title,author,pages,status) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status
}

Book.prototype.toggleStatus = function() {
  this.status = this.status === "read" ? "not-read" : "read";
}

Book.prototype.removeBookFromLibrary = function(){
 myLibrary.filter(elem=>{
    elem.title !== this.title
  })
  
}

function displayBooks() {
  let index = myLibrary.length - 1;
  
  const table = document.querySelector('table')
   
  table.innerHTML += 
  `
  <tr data-id='${index}'>
  <td>${myLibrary[index].title}</td>
  <td><p>${myLibrary[index].author}</p></td>
  <td><p>${myLibrary[index].pages} pages</p></td>
  <td><button  class="statusBtn-${index}" onclick="toggleStatusUi(${index})">${myLibrary[index].status}</button></td>
  <td><button class="deleteBook">❌</button></td>
  </tr>

  `

  const deleteBookItem = document.querySelectorAll('.deleteBook')

   deleteBookItem.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.target.parentElement.parentElement.remove();
   })
   })
}

function addBookToLibrary() {
  const inputTitle = document.querySelector('#title').value
  const inputAuthor = document.querySelector('#author').value
  const inputPages = document.querySelector('#pages').value
  const radioBtn = document.querySelectorAll('input[type="radio"]')
  let status;

  radioBtn.forEach( b => {
    if(b.checked){
      status = b.value 
    }
  })

  const book = new Book(inputTitle,inputAuthor,inputPages,status)
  myLibrary.push(book)
  clearInputs();
}

function toggleStatusUi(index){
  const book = myLibrary[index];
  book.toggleStatus();
  updateStatusUi(index,book.status);
}

function updateStatusUi(index,newStatus){
  const statusBtn = document.querySelector(`.statusBtn-${index}`);
  if(newStatus === 'not-read') {
    statusBtn.classList.remove('notread')
    statusBtn.classList.add('read');
    statusBtn.textContent = newStatus === 'read' ? 'Not read 😒' : 'read ✔';
  }
  else{
    statusBtn.classList.remove('read');
    statusBtn.classList.add('notread')
    statusBtn.textContent = newStatus === 'read' ? 'Not read 😒' : 'read ✔';
  }
 
}

function deleteBook(bookItem){
  bookItem.removeBookFromLibrary()
}

function clearInputs(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  // document.querySelectorAll('input[type="radio"]').forEach((b) => {
  //   b.value = false;
  // })
}

const addBtn = document.querySelector('.btn');
const submitBtn = document.querySelector('.submit');
const dialog = document.querySelector('dialog');

addBtn.addEventListener('click', () => {
 dialog.showModal()
});

submitBtn.addEventListener('click',(e) => {
  e.preventDefault()
  addBookToLibrary()
  displayBooks()
  dialog.close()
})


