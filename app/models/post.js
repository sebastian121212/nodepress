define(['gnd'], function(Gnd){
  'use strict';
  var PostSchema = new Gnd.Schema({
  	title:String,
  	content:String,
  	isPublic:Boolean
  })
  return Gnd.Model.extend('posts',PostSchema);
})