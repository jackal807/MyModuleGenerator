
var port = process.env.PORT || 17189;
var express        = require('express');


var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var http           = require('http');
var jwt            = require('jsonwebtoken');
var fs             = require('fs');
var request             = require('request');
var cheerio = require('cheerio');

var cors = require('cors');
app.use(cors());






// configuration ===========================================

// config files
var config = require('./config/db');

 // set our port
mongoose.connect(config.db, { useMongoClient: true }); // connect to our mongoDB database (commented out after you enter in your own credentials)




// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public/mymodulegenerator/www')); // set the static files location /public/img will be /img for users



// routes ==================================================

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on("connection", function(socket) {
  console.log ("A user connected!");
});

io.sockets.on("androidnotif", function(socket) {
    console.log("Ricevuta la notifica da parte del telefono android!");
    console.log(socket);
})
require('./app/routes')(app, io, jwt, cheerio, fs, request); // pass our application into our routes


var router = express.Router();
app.use('/api', router);
/*
app.use(app.router);
routes.initialize(app);
*/

app.set('jwtSecretKey', config.secret); // secret variable


server.listen(port);

// start app ===============================================
//app.listen(port);

console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
