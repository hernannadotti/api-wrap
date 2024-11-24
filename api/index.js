var express = require("express");
var app = express();
const router = express.Router();
var baseUrl = "https://apidev.mercantilandina.com.ar";
const subsKey = "d4f43f902b4049218451d78eb5966156";
const axios = require("axios");
const cors = require('cors');

app.listen(8000, () => {
  console.log('App running on PORT 3000')
});

app.use(cors())




const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded'
}


router.get("/credenciales", (req, res) => {
  axios.post(`${baseUrl}/credenciales/v2`, {}, {
    headers: headers
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    })
});

app.use(router);

module.exports = app;