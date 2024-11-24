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


router.get("/credenciales", async (req, res) => {
  try {
    const response = await axios.post(baseUrl + "/credenciales/v2/", {}, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.use(router);

module.exports = app;