// Require scraping libraries
var request = require('request');
var cheerio = require('cheerio');
// Require models
var Article = require('../models/articles.js');
var Comment = require('../models/comments.js');

module.exports = function(server) {


	// Server Routes --->
	server.get('/', function(req, res) {
		res.render('index', {});
	});

	server.get('/scrape', function(req, res) {
		console.log('Scrape route called');
		// Get contents of web page.
		request("http://www.azfamily.com/category/288182/news-arizona", function(error, response, html) {
		    // Scrape contents with Cheerio
		    var $ = cheerio.load(html);
		    // Iterate over stories
		    $("li.story").each(function(i, element) {
		    
		    	var result = {};
		    	var headline = $(this).children("a.headline").children("h4").text();
		    	// Hard code for KPHO.com, set as variable later if multiple sites scraped
		    	var website = "http://www.azfamily.com"
			    // Check for empty articles
			    if (headline) {
			    	// Define relevant properties to the results object
			    	result.headline = headline;
			    	result.summary = $(this).children("a.image").children("img").attr("title");
			    	result.website = website;
			    	result.path = $(this).children("a.image").attr("href");
			    	result.image = $(this).children("a.image").children("img").attr("src");
			    	result.publishedDate = $(this).children("time.publisheddate").text();
			    	result.lastEditedDate = $(this).children("time.lastediteddate").text();
			    	console.log(result);
			    }

		    	// Create Article model instance
		    	var newDoc = new Article(result);

		    	// Save to DB
		    	newDoc.save(function(err, doc) {
		        	// If error, log
		        	if (err) {
		          		console.log(err);
		        	}
		        	// If success, log
		        	else {
		          		console.log(doc);
		        	}
		      	});
		    });
		});

		res.render('index', {});
	});

	server.get('/articles', function(req, res) {
		console.log('Articles route called');
		res.render('index', {});
	});


};