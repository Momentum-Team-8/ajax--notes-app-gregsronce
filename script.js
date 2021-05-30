const url =  'http://localhost:3000/notes'
const form = document.querySelector('#notes-form')
const noteList = document.querySelector('#notes-list-display')
const submitButton = document.getElementById('submit-button')
const editForm = document.querySelector('#edit-form')

// Add event listener when form is submitted after a new note is written
form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText= document.getElementById('notes-input').value
    createNote(noteText)
    location.reload()
})

editForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log('Edit')
     const newTxt = document.getElementById('notes-edit').value
    editNote(newTxt)
})


// Add event listener to delete and edit notes
    noteList.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
        location.reload()
    } else if (event.target.classList.contains('edit')) {
        const newTxt = document.getElementById('notes-edit')
        newTxt.value = event.target.parentElement.innerText
    }    
})

// Read data GET request
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

// Create data POST request
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
//assigns the id of the noteObject to the id of the new element, 
function renderNoteItem(noteObject) {
    // creates new li 
    const itemEl = document.createElement('li')
itemEl.id = noteObject.id
// itemEl.classList.add(
//     'lh-copy',
//         'pv3',
//         'ba',
//         'bl-0',
//         'bt-0',
//         'br-0',
//         'b--dotted',
//         'b--black-3')
        
        renderNoteText(itemEl, noteObject)
        console.log(itemEl)
        noteList.appendChild(itemEl)
}

function editNote(element) {
    const noteID = element.parentElement.parentElement.id
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
    .then(data => renderNoteItem(data))   
}

// Delete data DELETE request -- thanks to Sara for figuring out!
function deleteNote(element) {
    const noteID = element.parentElement.parentElement.id
    fetch(url + "/" + `${noteID}`, {
        method: 'DELETE'
    })
    .then(() => element.parentElement.parentElement.remove())
}

function renderNoteText(noteListItem, noteObject) {
    noteListItem.innerHTML = `<span class="dib w-60">${noteObject.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}


listNotes(); 

