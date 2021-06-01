// create url variable and assign it the notes API url
const url =  'http://localhost:3000/notes'
// assign a form when you create a new note to a variable called form 
const form = document.querySelector('#notes-form')
// assign the unordered list to the variable noteList
const noteList = document.querySelector('#notes-list-display')
// assign the initial submit button to a variable called submitButton
const submitButton = document.getElementById('submit-button')
// assign a form for when you edit a note to a variable called editForm 
const editForm = document.querySelector('#edit-form')

// Add event listener when form is submitted after a new note is written
form.addEventListener('submit', event => {
    // prevents the form being submitted when the page reloads
    event.preventDefault()
    // create a variable that stores the value of the input 
    const noteText= document.getElementById('notes-input').value
    // uses the function createNote with the noteText variable passed in as an argument to create a new note with new note text
    createNote(noteText)
    // will refresh (reload) the page once the form has been submitted so that the noteText will not remain in the input.
    location.reload()
})

// Creates an addEvent Listener on the edit input once the input has been submitted.
// Then, the 
editForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log('Edit')
    const newTxt = document.getElementById('notes-edit').value
    editNote(newTxt)
})


// Add event listener to delete and edit notes once a button in the unordered note list is clicked.
// If the button has a class of "delete", the note will be deleted and the page will reload automatically with the note gone (another Get request will go through to display current notes).
// If the button has a class of "edit", the edit input's value will be the innerText of the note that needs to be edited.
    noteList.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
        location.reload()
    } else if (event.target.classList.contains('edit')) {
        const newTxt = document.getElementById('notes-edit')
        newTxt.value = event.target.parentElement.innerText
        
    }    
})

// Read data GET request--this retrieves data from JSON in the first promise.
// In the second promise, the data is extrapolated and looped over, pulling out each note as it is rendered. 
function listNotes() {
fetch(url)
.then((res) => res.json())
.then((data) => {
    for (let note of data) {
        // console.log(note)
        renderNoteItem(note)
 }
})
}

// Create data POST request. 
// Creates a function to create a new note with new text body (the value of the input).
// When fetch request made, first, pass in the URL.
// Also, the body will contain JSON content (the new note text as the title and body.) The date will be created using moment. 
// The first promise grabs the data.
// The second promise extrapolates the data so that it is usable and will render it on the page using renderNoteItem function.
function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => renderNoteItem(data))
}

function editNote(element) {
    const noteID = element.id
    const newTxt = document.getElementById('notes-edit').value

    fetch(url + '/' + `${noteID}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            title: newTxt,
            body: newTxt,
            create_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => (data))   
}

// Delete data DELETE request -- thanks to Sara for figuring out!--
// This function will delete the li (the note).
// The specific note ID is targeted in the fetch request (the id of the parent of the parent element which is the li).
// The promise indicates that the li will be removed (deleted).
function deleteNote(element) {
    const noteID = element.parentElement.parentElement.id
    fetch(url + "/" + `${noteID}`, {
        method: 'DELETE'
    })
    .then(() => element.parentElement.parentElement.remove())
}

// Function that will render the note item to the page. 
// A new element is created to store the text (in the noteObject.body) and other classes.
// Assign the id of the noteObject to the id of the new element (itemEl) created when createNote function runs.
// The new note text (the noteObject.body along with the delete and edit buttons) are rendered to the new element, the noteObject gets the body of the note.
// The ul (noteList) gets appended with the child itemEl
function renderNoteItem(noteObject) {
    const itemEl = document.createElement('li')
itemEl.id = noteObject.id
        
        renderNoteText(itemEl, noteObject)
        // console.log(itemEl)
        console.log(noteObject)
        noteList.appendChild(itemEl)
}

// This function will render the inner HTMl (classes, buttons, and body of note) to the li in the ul. 
function renderNoteText(noteListItem, noteObject) {
    noteListItem.innerHTML = `<span class="dib w-60">${noteObject.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

// Will reload the same data out of the Get request when page is refreshed.
listNotes(); 

