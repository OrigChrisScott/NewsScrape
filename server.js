// Require packages
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

// Set listening port
const PORT = process.env.PORT || 3000;

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


// Require routes
require('./controllers/htmlRoutes.js')(server);


// Start server listening on port
server.listen(PORT, function(err) {
	if (err) throw err;
	console.log('Server listening on port: ' + PORT);
});