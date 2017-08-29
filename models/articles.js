var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	headline		: 		{	
								type: String,
								required: true
							},
	summary			: 		{	
								type: String
							},
	website			: 		{	
								type: String,
								required: true
							},
	path			: 		{
								type: String,
								required: true
							},
	image			: 		{
								type: String
							},
	publishedDate 	: 		{
								type: Date,
								required: true,
								default: Date.now
							},
	lastEditedDate 	: 		{
								type: Date,
								required: true,
								default: Date.now
							},
	Comment			: 		{
								type: Schema.Types.ObjectId,
								ref: 'Comment'
							}
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;