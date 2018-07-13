const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());



app.set("cool", "jason"); // name of the setting cool the value is jason
//purpose is to access all database connection/request inside the whole of routes
// every routes can acess regardless the file is different
// in database connection we essentially only need one connection instead of man connection
// it is like a global variable


// routes or server points
app.get("/", (req, res) => {
  //const mySetting = req.app.get("cool");
  // res.send("massive-demo" + mySetting);
  const db = req.app.get("dbb");
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
  });
});

app.get("/incidents", (req, res) => {
  const db = req.app.get("dbb");
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState({statee: state}).then(incidents => {
      res.send(incidents);
    })
  } else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
    });
  }
});

app.post("/incidents", (req, res) => {
  const db = req.app.get('dbb');
  const incident = req.body;
  db.createIncident(incident).then(result => {
    res.send(result[0]); // by default insert do not return anything or empt array
  })
 
 
});


let {connectionString, port} = process.env;

// make a promise and make sure massive is run before our app listen
massive(connectionString).then(connection => {
  app.set("dbb", connection); // make sure that db variable can be access in different route
  // this 'dbb' value does not have to be the same name as 'db' folder
  // inside the root directory.  This is because massive will look for
  // 'db' folder in the root of directory by default
  // so the name must be  'db'. It cannot be other than that.
  app.listen(3004, () => {
    console.log("Started server on port", port);
  });
});
