var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

	body		: 		String,
	date		: 		Date

});


var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;