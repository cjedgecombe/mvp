const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const axios = require('axios');
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

  var requestConfig = {
    headers: {Authorization: LOTR_API_KEY}
  }

  // make get request to LOTR API for character specific information (if the character name is valid)
  axios.get(`https://the-one-api.dev/v2/character?name=${characterName}`, requestConfig)
  .then((response) => {
    // if the API resondes with an empty array, no character entries matched the search term
    if (response.data.docs.length === 0) {
      res.status(404).send('character lookup failed');
    } else {
      res.status(201).send(response.data.docs);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(404);
  })
})

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