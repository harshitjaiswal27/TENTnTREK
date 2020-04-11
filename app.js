var express = require("express");
    bodyParser = require('body-parser');
    app = express();
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true, useCreateIndex:true , useUnifiedTopology: true},function(err,res){
    if(err) console.log(err);
    else console.log("Connected");
});

var campgroundSchema = new mongoose.Schema({
    title : String,
    img : String,
    description : String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     "title" : "Las Vegas", "img" : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg",
//     "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
// },function(err,res){
//     if(err) console.log(err);
//     else console.log(res);
// })

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err) console.log(err)
        else res.render("index",{campgrounds : allCampgrounds});
    })
});

app.post("/campgrounds",function(req,res){
    var title = req.body.title;
    var img = req.body.image;
    var description = req.body.description;
    var newCampground = { title , img , description};
    Campground.create(newCampground,function(err,Campground){
        if(err) console.log(err);
        else console.log(Campground);
    })
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findOne({_id : req.params.id},function(err,foundCampground){
        if(err) console.log(err)
        else res.render("show",{ campground : foundCampground});
    });
})

app.listen(3000);

// var content = [
    
//     {
//         title : "Las Vegas",
//         img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg"
//     },
//     {
//         title : "Manhattan",
//         img   : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg"
//     },
//     {
//         title : "New York",
//         img   : "https://cdn.getyourguide.com/img/tour_img-1096032-146.jpg"
//     },
//     {
//         title : "Las Vegas",
//         img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg"
//     }
// ];
// "title" : "Las Vegas", "img" : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg"