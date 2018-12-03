var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
const musicDB = "mongodb://DarHallinan:Angular2018@ds119024.mlab.com:19024/music_events"
// connect to music DB
mongoose.connect(musicDB, err => {
    if (err) 
        console.error('Error! Could not connect to music DB... ' + err)
    else
        console.log('Connected to music database!')
})
// model that all events must follow
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    location: String,
    time: String,
    date: String,
    price: String,
    link: String
})
var PostModel = mongoose.model('post', postSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
// avoid CORS error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);

    PostModel.create({
        title: req.body.title,
        location: req.body.location,
        time: req.body.time,
        date: req.body.date,
        price: req.body.price,
        link: req.body.link
    });
    res.status(201).json({message:'Item added'})

})

app.get('/api/posts', function(req, res){
    PostModel.find(function(err, data){
        res.json(data);
    });
})

app.get('/api/posts/:id', function(req, res){
    console.log("Read post " +req.params.id);

    PostModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
})

app.put('/api/posts/:id', function(req, res){
    console.log("Update Post" +req.params.id);
    console.log(req.body.title);

    PostModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})

app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id},
    function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
})