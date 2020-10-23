var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get('/', function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + search;
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
            }
        });
});

app.listen(3000, function(){
    console.log("Movie API has just started!");
});
