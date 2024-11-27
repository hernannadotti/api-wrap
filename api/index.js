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

app.use(cors())


const headers = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/x-www-form-urlencoded'
}

const headersGet = {
  'Ocp-Apim-Subscription-Key': subsKey,
  'Content-Type': 'application/json',
  'Authorization': 'Bearer "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlSjJYY0JDbWh2MXhCNVZMX0s0M1VkWnU5MWFsaFNCaExXaUFVbUc0eFpJIn0.eyJleHAiOjE3MzI2ODA5MzQsImlhdCI6MTczMjY3NzMzNCwianRpIjoiNTNkMWFlMWYtYjEwMy00ZDJiLWIyZTktZDE3NjM5MWFiMGI3IiwiaXNzIjoiaHR0cHM6Ly9pZG0ucWFtZXJjYW50aWxhbmRpbmEuY29tLmFyL2F1dGgvcmVhbG1zL21lcmFuIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6NjdjMjA3ZGQtMDU5My00YTVlLThkNmQtMGZkMmU2N2Y3ZDljOkdBU0xVVFNUIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXBpLWNsaWVudGVzLWxvZ2luIiwic2lkIjoiMTI4Mzg4N2ItNjVmNy00MmQ2LTgyYmYtNDdlOWQ2ZTE2MzQ3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3d3dy5xYW1lcmNhbnRpbGFuZGluYS5jb20uYXIiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJwcm9kdWN0b3IiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmlja25hbWUiOiJHQVNMVVRTVCIsIm5hbWUiOiJMVUNBUyBHQVNDQVJEIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiR0FTTFVUU1QiLCJlbWFpbCI6Imp1YW4ucmlvYm9AbGFtZXJjYW50aWwuY29tLmFyIn0.gB6I1alnsruDEUkxJpL3l5zPL5G8JU1fjXs8MJsdaWsdAwD-jwasaXHAp_P74vZEoACQ2o0ruePlLkI8u_AOsSyTI5kTJRkq25irOqX0ziUHVL57enRQjWDt1fhK3YuKLw5Z-FrzFA-xa8gi4YxmZvB6UZEOgd_iiSpIhEGfzmDicCDeNx8tY9drPFDM_8RkmqitQxD6cb0zoqztuVgtM7PZplbHmrR8Ef1RqtLI94QV8PuQYfTcVsK5djwu7To2ASoNWSZ31yQHqGnbDQxTlJQBTa-s4L-KDbjn3jk7vA5jMP501crJGfAAPW5Auhlrslf_Emt_grLz8J3XiOwHaA'
}

// get Token
router.get("/credenciales", (req, res) => {
  axios.post(`${baseUrl}/credenciales/v2`, body, {
    headers: headers
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    })
});

// Get Localidades
router.get('/localidades', (req, res) => {
  axios.get(`${baseUrl}/generales/v1/localidades?q=${req.params.loc}`, {
    headers: headersGet
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