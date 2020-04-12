const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
    {
        title : "Las Vegas",
        img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        title : "Manhattan",
        img   : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        title : "New York",
        img   : "https://cdn.getyourguide.com/img/tour_img-1096032-146.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        title : "Las Vegas",
        img : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        "title" : "Las Vegas", 
        "img" : "https://www.casino.org/news/wp-content/uploads/2020/01/LAs-Vegas.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
]

module.exports = function seedDB(){
    //Remove all Campgrounds
    Campground.deleteMany({},function(err){
        // if(err) console.log(err);
        // else console.log("Removed Campgrounds");
         
        // //Add new Campgrounds
        // data.forEach(function(campground){
        //     Campground.create(campground,function(err,campground){
        //         if(err) console.log(err);
        //         else console.log("Added a Campground");

        //         //create a Comment
        //         Comment.create({
        //             text : "This place is Great, but I wish there has internet",
        //             author : "Harry"
        //         },function(err,comment){
        //             if(err) console.log(err);
        //             else {
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("Created new comment");
        //             }   
        //         })
        //     })
        // })
    });
}
