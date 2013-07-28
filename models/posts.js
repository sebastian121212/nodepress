var mongoose = require('mongoose');

var PostsSchema = new mongoose.Schema({
	title   : {type:String},
	content : {type:String},
crationDate : {type:Date, default:Date.now}
	//TODO: Add users support
	// Author : type:mongoose.Schema.ObjectId,ref:'User' 
})
var PostsModel = mongoose.model('Posts',PostsSchema);

module.exports = PostsModel;