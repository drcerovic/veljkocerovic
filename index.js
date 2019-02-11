var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    nodemailer     = require('nodemailer')


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'veljko.cerovic7@gmail.com',
        pass: 'doktorvecko1'
      }
    });
    

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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
    res.render("contact",  {page: 'contact'}); 
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
      text: 'Phone Number: ' + phone + ' Message: ' + message
    };
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        alert("message was sent");
      }
    });


   res.redirect("/contact");
});


 app.get("*", function(req, res){
    res.send("Page dose not exist"); 
 });

 app.listen(3000, 'localhost');


 app.on('listening', function() {
     console.log('Express app started on port %s at %s', app.address().port, app.address().address);
 });
 