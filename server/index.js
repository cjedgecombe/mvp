const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const axios = require('axios');
const db = require('../database');
const LOTR_API_KEY = require('../LOTR.config.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


// create post endpoint for when character names are submitted
app.post('/characters', (req, res) => {
  // access character name sent with request
  var characterName = req.body.data.charName;
  // check the database to see if a record for the character name already exists
  checkDB(characterName)
  .then((result) => {
    // if the resolved array has data in it, return the data to the client
    if (result.length > 0) {
      res.status(201).send(result);
    } else {
      // otherwise, submit a get request to the LOTR API for the character data
      const requestConfig = {
        headers: {Authorization: LOTR_API_KEY}
      }

      axios.get(`https://the-one-api.dev/v2/character?name=${characterName}`, requestConfig)
      .then((response) => {
        // if the API resondes with an empty array, no character entries matched the search term
        if (response.data.docs.length === 0) {
          res.status(404).send('character lookup failed');
        } else {
          // create and save a new record to the database before returning the character data to the client
          saveToDB(response.data.docs)
          .then((data) => {
            console.log(data);
            res.status(201).send(data);
          })

        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404);
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
})


// DATABASE QUERY HELPER FUNCTIONS
const checkDB = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM characters WHERE name = '${name}';`, (err, result) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log(result);
        resolve(result);
      }
    })
  })
}

const saveToDB = (array) => {
  return new Promise((resolve, reject) => {
    var data = array[0];

    var preparedData = prepareData(data);

    var sql = 'INSERT INTO characters (height, race, gender, birth, spouse, death, realm, hair, name, wikiUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    db.execute(sql, preparedData, (err, result) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        resolve(array);
      }
    })
  })
}


const prepareData = (object) => {
  var dataArray = Object.values(object);
  dataArray.splice(0, 1);
  return dataArray;
}

// LOTR API TEST FUNCTIONS
// var charTest = () => {
//   var requestConfig = {
//     headers: {Authorization: LOTR_API_KEY}
//   }

//   console.log(LOTR_API_KEY);

//   axios.get('https://the-one-api.dev/v2/character?name=Gandalf', requestConfig)
//   .then((reponse) => {
//     console.log(reponse.data.docs);
//   })
// }