var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    nodemailer     = require('nodemailer'),
    flash          = require("connect-flash"),
    session        = require('express-session'),
    cookieParser   = require('cookie-parser'),
    dotenv         = require('dotenv').config()
    
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'veljko.cerovic7@gmail.com',
        pass: process.env.GMAILPW
      }
    });

  
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser())
app.use(flash());

app.use(require("express-session")({
  secret: "Cao kralju!",
  resave: false,
  saveUninitialized: false
}));

app.use(function(req, res, next){
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next(); 
});

app.get("/", function(req, res){
    res.render("home",  {page: 'home'}); 
 });

 app.get("/portfolio", function(req, res){
    res.render("portfolio",  {page: 'portfolio'}); 
 });

 app.get("/about", function(req, res){
    res.render("about",  {page: 'about'}); 
 });

 app.get("/contact", function(req, res){
    res.render("contact",  {page: 'contact', messages: req.flash('error')}); 
 });
 
 app.post("/contact", function(req, res){
   var name = req.body.name;
   var email = req.body.email;
   var phone = req.body.phone;
   var message = req.body.message;
  
   var mailOptions = {
      from: email,
      to: 'veljko.cerovic7@gmail.com',
      subject: 'Message sent by: ' + name,
      text: 'Email: '+ email + ' Phone Number: ' + phone + ' Message: ' + message
    };
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        req.flash("error", "We couldn't send your message please try again!")
        res.redirect("/contact")
      } else {
        console.log('Email sent: ' + info.response);
        req.flash("success", "Message was successfully sent!")
        res.redirect("/contact");
      }
    });


   
});




 app.get("*", function(req, res){
    res.redirect("/");
 });

 app.listen(3000, 'localhost');


 app.on('listening', function() {
     console.log('Express app started on port %s at %s', app.address().port, app.address().address);
 });
 