var http = require("http");
var express = require("express");
var app = express(http.createServer);
var api = require("./index");
var cfg = require("./config.json");

api(__dirname, cfg, express.Router(), app);

app.listen(3030, "localhost", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Testserver running...");
  }
});
