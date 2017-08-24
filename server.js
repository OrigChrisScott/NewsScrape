// Require packages
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
// Require models
var articles = require('./models/articles.js');
var comments = require('./models/comments.js');
// Require scraping libraries
var request = require('request');
var cheerio = require('cheerio');


// Set listening port
const PORT = 3000;

// Instantiate express server
var server = express();
// Set body-parser to parse request bodies
server.use(bodyParser.urlencoded({ extended: false }));
// Set method-override to handle PUt and DELETE methods
server.use(methodOverride('_method'));
// Set static asset folder
server.use(express.static('public'));
// Set handlebars engine
server.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');

// Config Mongoose for MongoDB interaction
mongoose.connect('mongodb://localhost/newsscrape', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', function() {
	console.log('There was an error connecting to the MongoDB database');
});
db.once('open', function() {
	console.log('Connected to MongoDB');
});


// Server Routes --->
server.get('/', function(req, res) {
	res.send('Server is up');
});



// Start server listening on port
server.listen(PORT, function(err) {
	if (err) throw err;
	console.log('Server listening on port: ' + PORT);
});