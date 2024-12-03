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

axios.interceptors.request.use(function (config) {
    // fixHeaders = getFixHeaders();
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    setFixHeaders(response.data.access_token);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


app.listen(8000, () => {
  console.log('App running on PORT 3000');
});

let authToken = '';

const body = {
  'username': 'GASLUTST',
  'password': 'gaslu2024',
  'grant_type': 'password',
  'client_id': 'api-clientes-login',
}


app.use(cors({ credentials: true, origin: true }));
axios.defaults.withCredentials = true


const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded',
  'Allow-Origin': '*',
  'Access-Control-Allow-Origin': '*',
}

const fixHeaders = {}

function setFixHeaders (token) {
  fixHeaders['Authorization'] = `Bearer ${token}`;
  fixHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
  fixHeaders['Allow-Origin'] = '*';
  fixHeaders['Access-Control-Allow-Origin'] = '*';
}

function getFixHeaders () {
  return fixHeaders;
}


router.get("/credenciales", (req, res) => {
  // axios.post(`${baseUrl}/credenciales/v2`, body, {
  //   headers: headers
  // }).then(response => {
  //   res.cookie('access_token', response.data.access_token , {maxAge: 9000000000, httpOnly: true });
  //   res.send(response.data);
  // }).catch(error => {
  //   res.send(error);
  // })
  function getTokenFromServer() {
    return axios.request({
        method: "post",
        baseURL: `${baseUrl}/credenciales/v2`,
        data: {
          'username': 'GASLUTST',
          'password': 'gaslu2024',
          'grant_type': 'password',
          'client_id': 'api-clientes-login',
        },
        headers: {
          'Ocp-Apim-Subscription-Key': subsKey,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Allow-Origin': '*',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(function (response) {
        res.send(response.data);
        return response.data
        //console.log(datax.access_token);
  
      }).catch((er) => {
        console.log(er);
      });
      console.log(tok);
      //console.log(reqtoken);
      // res.render('links/bbvat',{reqbbva: reqbbva});
    }

    getTokenFromServer().then(data => {
      return data.access_token;
    });
})



// Get Localidades
router.get('/localidades/:q',(req, res) => {
  axios.get(`${baseUrl}/generales/v1/localidades?q=${req.params.q}`, { 
    headers: 
    {
      'Ocp-Apim-Subscription-Key': subsKey,
      'Authorization': `${req.headers.authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Allow-Origin': '*',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
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