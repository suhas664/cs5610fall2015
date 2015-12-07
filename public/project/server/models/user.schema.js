'use strict';

module.exports = function (mongoose) {
	var UserSchema = new mongoose.Schema({
    	id : mongoose.Schema.Types.ObjectId,
    	username : String,
    	password : String,
    	firstName : String,
    	lastName : String,
    	email : String,
    	gitusername : String,
  }, {collection: 'cs5610.assignment.user'});
  	return UserSchema;
};