var express     = require("express");
    bodyParser  = require('body-parser');
    app         = express();
    mongoose    = require('mongoose');
    Campground  = require('./models/campground');
    Comment     = require('./models/comment')
    seedDB      = require('./seed');

mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true, useCreateIndex:true , useUnifiedTopology: true},function(err,res){
    if(err) console.log(err);
    else console.log("Connected to Database");
});

// seedDB();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err) console.log(err)
        else res.render("campgrounds/index",{campgrounds : allCampgrounds});
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
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) console.log(err)
        else res.render("campgrounds/show",{ campground : foundCampground});
    });
})

app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err) console.log(err);
        else res.render("comments/new",{campground:foundCampground});
    })
})

app.post("/campgrounds/:id/comments",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) console.log(err);
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
})

app.listen(3000,function(err){
    if(err) console.log(err);
    else console.log("YelpCamp Server Started And Running on port 3000");
});

