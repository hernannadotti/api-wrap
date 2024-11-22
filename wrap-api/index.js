var express = require("express");
var app = express();
var baseUrl = "https://apidev.mercantilandina.com.ar";
const subsKey = "d4f43f902b4049218451d78eb5966156";
app.listen(3000, () => {});


app.post(baseUrl + "/credenciales/v2/", (req, res, next) => {
  res.send(encodeURI(body.toString()));
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  res.setHeader('Ocp-Apim-Subscription-Key', subsKey)
  ReadableStream.setHeader('Access-Control-Allow-Origin', '*');
 });