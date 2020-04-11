var express = require("express");

var app = express();

app.set("view engine","ejs");

app.use(express.static("public"));
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campground",function(req,res){

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
    res.render("campground",{ content : content});
});

app.post("/campground",function(req,res){
    res.send("You sent a post request");
});

app.get("/campground/new",function(req,res){
    res.render("newCampground.ejs");
});

app.listen(3000);