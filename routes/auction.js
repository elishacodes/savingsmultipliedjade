var express = require('express');
var app = express.Router();
var productList = [];

var Product = require('../models/product');

// Send the error message back to the client
var sendError = function (req, res, err, message) {
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};

app.post('/', function(req, res, next){

  // User is editing an existing item
  if (req.body.db_id !== "") {

    // What did the user enter in the form?
    var theFormPostData = req.body

    console.log('theFormPostData',theFormPostData);


    var myProduct = new Product(theFormPostData);
    myProduct.save(function (err, product) {
      if (err) {
        sendError(req, res, err, "Failed to save item");
      } else {
        res.redirect('/auction');
      }
    });
  }
});

var sendProductList = function (req, res, next) {


  Product.find({}, function (err, products) {
    console.log("products",products);
    // Swap out the user._id for the user.username

    if (err) {
      console.log(err);
      sendError(req, res, err, "Could not get auction items");
    } else {
      res.render("auction", {
        title: "List of Products",
        message: "My Shopping List",
        products: products
      });
    }
  });
};

/* GET home page. */
app.get('/', function(req, res, next) {

  sendProductList(req, res, next);


});

// Handle a DELETE request from the client to /grocery
app.delete('/', function (req, res) {
console.log(req.body.product_id);
  Product.find({ _id: req.body.product_id })
      .remove(function (err) { // this is how you delete records from the db: .remove
    // Was there an error when removing?
    if (err) {
      sendError(req, res, err, "Could not delete the item");

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });
});


module.exports = app;
