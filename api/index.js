var express = require("express");
var app = express();
const router = express.Router();
var baseUrl = "https://apidev.mercantilandina.com.ar";
const subsKey = "d4f43f902b4049218451d78eb5966156";
const axios = require("axios");
const cors = require('cors');
const bearerToken = require('express-bearer-token');

app.listen(8000, () => {
  console.log('App running on PORT 3000')
});

const body = {
  'username': 'GASLUTST',
  'password': 'gaslu2024',
  'grant_type': 'password',
  'client_id': 'api-clientes-login',
}
  

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
}

app.use(cors());
app.use(bearerToken());

const authToken = '';
const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded'
}

const headersGet = {
  'Ocp-Apim-Subscription-Key': subsKey
}

// get Token
router.get("/credenciales", (req, res) => {
  axios.post(`${baseUrl}/credenciales/v2`, body, {
    headers: headers
  })
    .then(response => {
      bearerToken({
        bodyKey: `${response.data.access_token}`,
        queryKey: `${response.data.access_token}`,
        headerKey: 'Bearer',
        reqKey: 'token',
        cookie: false, // by default is disabled
      })
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    })
});

// Get Localidades
router.get('/localidades', (req, res) => {
  console.log(res.params)
  axios.get(`${baseUrl}/generales/v1/localidades?q=${req.params.q}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Ocp-Apim-Subscription-Key': subsKey
    }
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