var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var content = [
    {
        title : "Manhattan",
        img   : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg"
    },
    {
        title : "New York",
        img   : "https://cdn.getyourguide.com/img/tour_img-1096032-146.jpg"
    },
    {
        title : "Las Vegas",
        img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg"
    },
    {
        title : "Manhattan",
        img   : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg"
    },
    {
        title : "New York",
        img   : "https://cdn.getyourguide.com/img/tour_img-1096032-146.jpg"
    },
    {
        title : "Las Vegas",
        img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg"
    }
];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{ content : content});
});

app.post("/campgrounds",function(req,res){
    var title = req.body.title;
    var img = req.body.image;
    var newCampground = { title , img };
    content.push(newCampground);
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new",function(req,res){
    res.render("newCampground.ejs");
});

app.listen(3000);