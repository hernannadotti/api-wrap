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
const bearerToken = require('express-bearer-token');
app.use(bearerToken());

// app.use(function (req, res) {
//   res.send('Token '+req?.token);
// });

app.use(bearerToken({
  bodyKey: 'access_token',
  queryKey: 'access_token',
  headerKey: 'Bearer',
  reqKey: 'token',
  cookie: true, // by default is disabled
}));

app.use(bearerToken({
  cookie: {
    signed: true, // if passed true you must pass secret otherwise will throw error
    secret: 'YOUR_APP_SECRET',
    key: 'access_token' // default value
  }
}));


app.listen(8000, () => {
  console.log('App running on PORT 3000');
});

const body = {
  'username': 'GASLUTST',
  'password': 'gaslu2024',
  'grant_type': 'password',
  'client_id': 'api-clientes-login',
}


app.use(cors());

const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded'
}


router.get("/credenciales", (req, res) => {
  axios.post(`${baseUrl}/credenciales/v2`, body, {
    headers: headers
  }).then(response => {
    res.cookie('access_token', response.data.access_token , {maxAge: 9000000000, httpOnly: true, secure: true });
    res.send(response.data);
  }).catch(error => {
    res.send(error);
  })
})



// Get Localidades
router.get('/localidades/:q',(req, res) => {
  let token = req.cookies.access_token;
  axios.get(`${baseUrl}/generales/v1/localidades?q=${req.params.q}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': subsKey,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
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