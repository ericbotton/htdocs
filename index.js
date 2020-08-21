/*jshint esversion: 6 */
const port = 3000;

const bodyParser = require("body-parser");
const request    = require("request");
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("/"));
//

app.get("/", function(req, res) {
  // res.send("<h1 style='color:salmon;'>Adding Machine - <em style='color:blue;'>coming soon...</em></h1>");
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, function() {
  console.log('express server listening at localhost:' + port);
});
