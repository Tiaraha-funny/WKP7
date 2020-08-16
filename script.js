console.log('work');

//I am gong to create array of object to access my book's description

const books = [
    {
        title: "Gathering in blue",
        author: "Lois Lowry",
        genre: "Mystery",
        pages: 550,
        status: true,
    },
    {
        title: "Harry Potter and the Philosopher Stone",
        author: "JK Rowling",
        genre: "Fantasy",
        pages: 323,
        status: false,
    },
    {
        title: "Clean Code: A Handbook of Software Engineering",
        author: "Robert C. Martin",
        genre: "IT",
        pages: 434,
        status: true,
    },
    {
        title: "Pachinko",
        author: "Min Jin Lee",
        genre: "Fiction",
        pages: 496,
        status: true,
    },
    {
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        pages: 400,
        status: true,
    },
]


//This is holding the the states
const book = [...books];

//drag the add button from the html

const tableList = document.querySelector("tr");
const form = document.querySelector('form');

// const addBtn = document.querySelector('.add');

//Create the html to give the lists in the table

const HtmlOfTheTableList = book.map(newBook => `
  <tr class="body">
      <td>${newBook.title}</td>
      <td>${newBook.author}</td>
      <td>${newBook.genre}</td>
      <td>${newBook.pages}</td>
      <td>
        <input type="checkbox" id="${newBook.status}">
      </td>
      <td><button class="delete">delete</button></td>
  </tr><hr>
  `).join('');
  tableList.insertAdjacentHTML("afterend", HtmlOfTheTableList);

  //this array is holding our states
  const mybooks = [];

//function about the adding the book list in the table

const handleAddSubmitBtn = e => {

  console.log('add button is clicked');
  e.preventDefault();

  const form = e.currentTarget;
    // const {title, author, genre, pages, status} = form;
        
    const myBook = {
      title:form.title.value,
      author:form.author.value,
      genre: form.genre.value,
      pages: form.pages.value,
      status: form.status.value,
      id: Date.now(),
    };

  //push the items into our state
  mybooks.push(myBook);

  e.target.reset();

  newTableFromTheState();

};

//Function to handle the html from the states

const newTableFromTheState = () => {

  const HTML = mybooks.map(bookState =>`
  <tr data-id="${bookState.id}" class="body">
      <td>${bookState.title}</td>
      <td>${bookState.author}</td>
      <td>${bookState.genre}</td>
      <td>${bookState.pages}</td>
      <td>
        <input type="checkbox" ${bookState.status === "read" ? "checked" : ""}>
      </td>
      <td><button class="delete">delete</button></td>
  </tr><hr>`).join('');
  tableList.insertAdjacentHTML("afterend", HTML);
}

// local storage is to set the key and value and get the value of the item wich we give
const toLocalStorage = () => { 
  localStorage.setItem('mybooks', JSON.stringify(mybooks));
} 

const restoreFromLocalStorage = () => {
  console.log('restoring from the local storage');
  const booksItems = JSON.parse(localStorage.getItem('mybooks'));
  //check if the there's something inside the local storage
    if(booksItems) {
    //push has no limit for arguments
      mybooks.push(...booksItems);
  }

    toLocalStorage();
};

const handleDeleteButton = e => {
  const id = e.target.value;
  if(e.target.matches('button.delete')) {
    mybooks = mybooks.filter(item => item.id !== id);
    newTableFromTheState();
    }
}


 //We listen to our own event, and launch the function table of the added book functon by the listners which we have created
form.addEventListener('submit', handleAddSubmitBtn);
window.addEventListener('click', handleDeleteButton);

restoreFromLocalStorage();
