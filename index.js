var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("home"); 
 });

 app.get("/portfolio", function(req, res){
    res.send("portfolio"); 
 });

 app.get("/about", function(req, res){
    res.send("about"); 
 });

 app.get("/contact", function(req, res){
    res.send("contact"); 
 });

 app.listen(3000, 'localhost');
 app.on('listening', function() {
     console.log('Express app started on port %s at %s', app.address().port, app.address().address);
 });
 