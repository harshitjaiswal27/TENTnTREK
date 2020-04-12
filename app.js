var express         = require("express");
    bodyParser      = require('body-parser');
    app             = express();
    mongoose        = require('mongoose');
    Campground      = require('./models/campground');
    passport        = require('passport');
    LocalStrategy   = require('passport-local');
    seedDB          = require('./seed');
    Comment         = require('./models/comment');
    User            = require('./models/user');

mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser: true, useCreateIndex:true , useUnifiedTopology: true},function(err,res){
    if(err) console.log(err);
    else console.log("Connected to Database");
});

// seedDB();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

app.use(require('express-session')({
    secret : "Always Use Passportjs to make Authentication Easier",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err) console.log(err);
        else res.render("comments/new",{campground:foundCampground});
    })
})

app.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
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

//Auth routes

app.get("/register",function(req,res){
    res.render("register");
})

app.post("/register",function(req,res){
    User.register(new User({username : req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    })
});

app.get("/login",function(req,res){
    res.render("login"); 
}); 

app.post("/login", passport.authenticate("local",
    {
        successRedirect : ("/campgrounds"),
        failureRedirect : ("/login")
    }),function(req,res){
})

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000,function(err){
    if(err) console.log(err);
    else console.log("YelpCamp Server Started And Running on port 3000");
});

