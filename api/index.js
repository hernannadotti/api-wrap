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



app.listen(8000, () => {
  console.log('App running on PORT 3000');
});



app.use(cors({ credentials: true, origin: true }));
axios.defaults.withCredentials = true




router.get("/credenciales", (req, res) => {
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

// Get Marcas
router.get('/marcas',(req, res) => {
  axios.get(`${baseUrl}/vehiculos/v1/marcas`, { 
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

// Get Models By Brand
router.get('/marcas/:brand/:year',(req, res) => {
  axios.get(`${baseUrl}/vehiculos/v1/marcas/${req.params.brand}/${req.params.year}`, { 
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

// Get Vehicles By Model
router.get('/marcas/:brand/:year/:model',(req, res) => {
  axios.get(`${baseUrl}/vehiculos/v1/marcas/${req.params.brand}/${req.params.year}/${req.params.model}`, { 
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

// Get Vehicles By InfoAuto
router.get('/vehiculos/:infoAuto',(req, res) => {
  axios.get(`${baseUrl}/vehiculos/v1/infoauto/${req.params.infoAuto}`, { 
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

// Get Values by Vehicle Id
router.get('/valores/:idVehicle',(req, res) => {
  axios.get(`${baseUrl}/vehiculos/v1/${req.params.idVehicle}/valores`, { 
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

// Get Quote Car
router.post('/cotizacion',(req, res) => {
  function getCotizacion() {
    return axios.request({
      method: 'post',
      baseURL: `${baseUrl}/cotizaciones/v2/auto`,
      headers:
      {
        'Ocp-Apim-Subscription-Key': subsKey,
        'Authorization': `${req.headers.authorization}`,
        'Content-Type': 'application/json',
        'Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*',
      },
      data: req.body,
      withCredentials: true
    })
      .then(response => {
        res.send(response.data);
        return response.data;
      })
      .catch(error => {
        res.send(error);
      })
  }
  
  getCotizacion().then(data => {
    return data;
  });
  // axios.post(`${baseUrl}/cotizaciones/v2/auto`, { 
  //   body: req.body,
  //   headers: 
  //   {
  //     'Ocp-Apim-Subscription-Key': subsKey,
  //     'Authorization': `${req.headers.authorization}`,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Allow-Origin': '*',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   withCredentials: true
  // })
  //   .then(response => {
  //     res.send(response.data);
  //   })
  //   .catch(error => {
  //     res.send(error);
  //   })
});


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// application/json
app.use(bodyParser.json());
app.use(router);

module.exports = app;