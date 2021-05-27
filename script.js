const url =  'http://localhost:3000/notes'

const root = document.querySelector('#container')


fetch(url)
.then((res) => res.json())
.then((data) => {
    console.log(data)
    const notes = document.createElement('h1')
    root.appendChild(notes)
    notes.innerText = `${data[0].title} \n \n ${data[0].body}`
})