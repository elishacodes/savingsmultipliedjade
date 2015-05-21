var Q = require("q");
var express = require('express');
var app = express.Router();
var UserController = require("../userController");
var UserModel = require("../models/user");

// Send the error message back to the client
var sendError = function (req, res, err, message){
  console.log('Render the error template back to the client.');
  res.render("error", {
    error: {
      status: 500,
      stack: JSON.stringify(err.errors)
    },
    message: message
  });
};



// Handle the request for the registration form
app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  var newUser = new UserModel(req.body);

  newUser.save(function (err, user){
    if(err){
      sendError(req, res, err, "Failed to register user");
    }
    else{
      res.redirect("/auction");
    }
  });
});


app.get("/login", function(req, res){
  res.render("login");
});

//Handle the login action
app.post("/login", function (req, res){
  console.log("Hi, this is node handling the user/login route");

  UserController.login(req.body.username, req.body.password)

  .then(function (validUser){
    console.log('Ok, now we are back in the route handling code and have found a user');
    console.log('validUser',validUser);
    res.redirect("/")
  })

  .fail(function(err){
    console.log('Failed looking up the user');
    sendError(req, res, {errors: err.message}, "Failed")
  })
});

/* Logout User. */
app.get('/logout', function(req, res) {
  UserController.logout();
  res.redirect("/");
});

module.exports = app;
