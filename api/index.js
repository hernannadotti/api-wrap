var express = require("express");
var app = express();
const router = express.Router();
var baseUrl = "https://apidev.mercantilandina.com.ar";
const subsKey = "d4f43f902b4049218451d78eb5966156";
const axios = require("axios");
const cors = require('cors');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

const authToken = '';
const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded'
}

const headersGet = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded'
}

// get Token
router.get("/credenciales", (req, res, next) => {
  axios.post(`${baseUrl}/credenciales/v2`, body, {
    headers: headers
  })
    .then(response => {
      // localStorage.setItem('token', response.data.access_token);
      res.cookie('token', response.data.access_token);
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    })
});



// Get Localidades
router.get('/localidades/:q', (req, res) => {
  axios.get(`${baseUrl}/generales/v1/localidades?q=${req.params.q}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': subsKey,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${req.cookies.token}`,
      'Accept': 'application/json',
      'Allow-Control-Allow-Origin': '*'

    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    })
});


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// application/json
app.use(bodyParser.json());
app.use(router);

module.exports = app;