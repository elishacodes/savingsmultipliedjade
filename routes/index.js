var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Savings Multiplied | Home' });
});

app.get("/sell", function(req, res){
  res.render("sell", {title: 'Savings Multiplied | Sell'});
});

module.exports = app;
