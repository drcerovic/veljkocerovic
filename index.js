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
  secret: process.env.SECRETCODE,
  resave: false,
  saveUninitialized: false
}));

app.use(function(req, res, next){
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next(); 
});

app.get("/en", function(req, res){
    res.render("home",  {page: 'home'}); 
 });

 app.get("/", function(req, res){
  res.render("pocetna",  {page: 'home'}); 
});

 app.get("/en/portfolio", function(req, res){
    res.render("portfolio",  {page: 'portfolio'}); 
 });

 app.get("/radovi", function(req, res){
  res.render("radovi",  {page: 'portfolio'}); 
});

 app.get("/en/about", function(req, res){
    res.render("about",  {page: 'about'}); 
 });
 
 app.get("/o-meni", function(req, res){
  res.render("omeni",  {page: 'about'}); 
});


 app.get("/en/contact", function(req, res){
    res.render("contact",  {page: 'contact', messages: req.flash('error')}); 
 });
 
 app.post("/en/contact", function(req, res){
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
        res.redirect("/en/contact")
      } else {
        console.log('Email sent: ' + info.response);
        req.flash("success", "Message was successfully sent!")
        res.redirect("/en/contact");
      }
    });


   
});


app.get("/kontakt", function(req, res){
  res.render("kontakt",  {page: 'contact', messages: req.flash('error')}); 
});

app.post("/kontakt", function(req, res){
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
      req.flash("error", "Nismo mogli da posaljemo vasu poruku, pokusajte ponovo!")
      res.redirect("/kontakt")
    } else {
      console.log('Email sent: ' + info.response);
      req.flash("success", "Poruka je uspesno poslata!")
      res.redirect("/kontakt");
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
 