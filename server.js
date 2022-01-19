console.log("Program start")


const express = require("express");
const path = require("path");
const fs = require("fs")
const util = require('util');

const uuid = require('./helpers/uuid');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// HTML Routes
// =============================================================

// GET FETCH REQUEST
// INDEX ROUTE
  app.get("/",  (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log(`${req.method} received`)
  });

// ==================================FUNCTIONS TO CREATE READ-AND-APPEND FUNCTION==============================================

const readFromFile = util.promisify(fs.readFile);
  /**
 *  Function to write notes to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nnotes written to ${destination}`)
);

/**
*  Function to read notes from a given a file and append some content
*  @param {object} content The content you want to append to the file.
*  @param {string} file The path to the file you want to save to.
*  @returns {void} Nothing
*/
const readAndAppend = (content, file) => {
fs.readFile(file, 'utf8', (err, notes) => {
  if (err) {
    console.error(err);
  } else {
    const parsedNotes = JSON.parse(notes);
    parsedNotes.push(content);
    writeToFile(file, parsedNotes);
  }
});
};

// =======================================END OF READ-AND-APPEND FUNCTIONS=======================================================

// NOTES ROUTE - load html
  app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log(`${req.method} received`)

  });

  

// POST FETCH REQUEST - Grab user input
app.post("/api/notes",  (req, res) => {

  console.info(`${req.method} request received`);

      // Destructuring assignment for the items in req.body
      const { title, text } = req.body;

      // var id = notes[notes.length - 1].id + 1

      if (req.body) {   
        const newNote = {
          title,
          text,
          id: uuid() 
        };
      
    

        readAndAppend(newNote, './db/db.json');
          res.json(`Note added successfully 🚀`);
      } else {
          res.error('Error in adding note');
      }
  
});

// GET NEW db 
app.get("/api/notes",  (req, res) => {
 
  res.sendFile(path.join(__dirname, "/db/db.json"));
  console.log(`${req.method} received`)

  


});



app.delete("/api/notes/:id", function (req, res) {

  console.log('server delete')
  
  console.info(`${req.method} request received`);
 
  const id  =  req.params.id

     
  
  const noteId = id

  // console.log(noteId)
  // notes = notes.filter(val => val.id !== noteId)
  
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    } else { 
      notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    }
    // notes = JSON.parse(notes)

    // notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })

});

app.put("/api/notes/:id", function (req, res) {

  
  console.info(`${req.method} request received`);
  const { title, text } = req.body;
     
  if (req.body) {   
    const newNote = {
      title,
      text,
      id
    };
  
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  notes = notes.filter(val => val.id !== noteId)
  
  
  write(newNote, './db/db.json');
  res.json(`Note added successfully 🚀`);
} else {
  res.error('Error in adding note');
}

});
  


                
  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);