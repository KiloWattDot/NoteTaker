
// import express

const express = require('express');
const path = require('path');
const app = express(); 
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;

// static folder
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET request routes
app.get('/index', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// Post request route 
app.post('/api/notes', (req, res) => {
// retrieve response or note, then push to the db of notes
// Then return the entire db of notes including the new note that was just added


  


})




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);