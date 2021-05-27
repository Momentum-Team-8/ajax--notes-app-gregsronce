const url =  'http://localhost:3000/notes'
const form = document.querySelector('#notes-form')
const notesList = document.querySelector('#notes-list')
const submitButton = document.getElementById('submit-button')

form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText= document.getElementById('notes-input').value
    fetch(url, {
        method: 'POST',
        header: {'Content-type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
})

function listNotes() {
fetch(url)
.then((res) => res.json())
.then((data) => {
    for (let note of data) {
        console.log(note)
        // renderNoteItem(note)
 }
})
}

