//Load express

let express = require('express');
let server = express();

//Set up the server

server.use('/', express.static('public')); 
server.use(express.json()); 

//Set up the database

let DataStore = require('nedb');
let db = new DataStore('emojis.db');
db.loadDatabase();

//Get past submissions with a "GET" request

server.get('/past_emoji', (request, response) => {

  //Search the database for previous entries

  db.find({}, (err, docs) => {
    if (err) {
      //Handles an error
      response.json({ 
        task: "Unable to search database" 
      });

    } else {
      //Gets the previous entries

      let messageData = {
        data: docs
      }

      //Passes back to server
      response.json(messageData);
    }
  })
});

//Add new entry to database using a "POST" request

server.post('/new_emoji', (request, response) => {
  //Gets the data from server
  let requestData = request.body;

  //Adds it to an object
  let data = {
    content: requestData
  }

  //Inserts it into database
  db.insert(request.body, (err, newDocs) => {
    if (err) {
      //Handles error
      response.json({ task: "Couldn't insert" });
    } else {
      //Gets the insert response
      response.json(data);
    }
  });
});

//This is the port for the app to run on
server.listen(3000, () => {
  console.log("lServer listening on localhost:3000")
})