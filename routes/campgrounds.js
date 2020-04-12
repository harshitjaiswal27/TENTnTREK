var express     = require('express');
    router      = express.Router();
    Campground  = require('../models/campground');

router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err) console.log(err)
        else res.render("campgrounds/index",{campgrounds : allCampgrounds});
    })
});

router.post("/",function(req,res){
    var title = req.body.title;
    var img = req.body.image;
    var description = req.body.description;
    var newCampground = { title , img , description};
    Campground.create(newCampground,function(err,Campground){
        if(err) console.log(err);
    })
    res.redirect("/campgrounds")
});

router.get("/new",function(req,res){
    res.render("campgrounds/new.ejs");
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) console.log(err)
        else res.render("campgrounds/show",{ campground : foundCampground});
    });
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;