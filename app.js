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
    campgroundRoutes = require('./routes/campgrounds');
    commentRoutes   = require('./routes/comments');
    indexRoutes      = require('./routes/index');

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

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

app.listen(3000,function(err){
    if(err) console.log(err);
    else console.log("YelpCamp Server Started And Running on port 3000");
});

