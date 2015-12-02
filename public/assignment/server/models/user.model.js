"use strict";

var uuid = require("node-uuid");
var q = require("q");

module.exports = function(db, mongoose) {

	var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

	var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		FindUserByUsername: FindUserByUsername,
		FindUserByCredentials: FindUserByCredentials,
		Update: Update,
		Delete: Delete
	};

	return api;

	function Create(user) {
		//console.log("create is being called");
		var deferred = q.defer();
		user.id = user._id = mongoose.Types.ObjectId();
    	UserModel.create(user, function(error, new_user) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(new_user);
    	});
    	return deferred.promise;
	}

	function FindAll() { 
		var deferred = q.defer();
    	UserModel.find(function(error, users) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(users);
    	});
    	return deferred.promise; 
	}

	function FindById(id) {
		var deferred = q.defer();
    	UserModel.findOne({id : id}, function(error, user) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(user);
    	});
    	return deferred.promise;
	}

	function FindUserByUsername(username) {
		var deferred = q.defer();
    	UserModel.findOne({username : username}, function(error, user) {
     	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(user);
    	});
    	return deferred.promise;
	}

    function FindUserByCredentials(credentials) {
        var deferred = q.defer();
	    UserModel.findOne(credentials, function(error, user) {
	    if (error)
	        deferred.reject(error);
	    else
	        deferred.resolve(user);
	    });
	    return deferred.promise;
    }

	function Update(id, new_user) {
		//console.log("Update called in model.js");
		//console.log(new_user);
		var deferred = q.defer();
	    UserModel.findOneAndUpdate({
            id: id
        }, {
            firstName: new_user.firstName,
            lastName: new_user.lastName,
            username: new_user.username,
            password: new_user.password,
            email: new_user.email
        }, function (error, result) {
            deferred.resolve(new_user);
        });
        return deferred.promise;
	}

	function Delete(id) {
	var deferred = q.defer();
    UserModel.remove({id: id}, function(error){
    if(error){
    	deferred.reject(error);
    } 
    else{
        FindAll()
          	.then(function(users){
            deferred.resolve(users);
          	});
      	}
    	});
    	return deferred.promise;
	}
};