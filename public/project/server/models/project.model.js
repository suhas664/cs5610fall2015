"use strict";

var uuid = require("node-uuid");
var q = require("q");

module.exports = function(db, mongoose) {

	var ProjectSchema = require('./project.schema.js')(mongoose);
    var ProjectModel = mongoose.model('ProjectModel', ProjectSchema);

	var api = {
		Create: Create,
		FindAll: FindAll,
		FindById: FindById,
		FindProjectsByTitle: FindProjectsByTitle,
		FindProjectsByOwner: FindProjectsByOwner,
		Update: Update,
		Delete: Delete
	};

	return api;

	function Create(project) {
		//console.log("create is being called");
		var deferred = q.defer();
		project.id = project._id = mongoose.Types.ObjectId();
    	ProjectModel.create(project, function(error, new_project) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(new_project);
    	});
    	return deferred.promise;
	}

	function FindAll() { 
		var deferred = q.defer();
    	ProjectModel.find(function(error, projects) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(projects);
    	});
    	return deferred.promise; 
	}

	function FindById(id) {
		var deferred = q.defer();
    	ProjectModel.findOne({id : id}, function(error, project) {
      	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(project);
    	});
    	return deferred.promise;
	}

	function FindProjectsByTitle(title) {
		var deferred = q.defer();
    	ProjectModel.find({title : new RegExp(title, "i")}, function(error, projects) {
     	if (error)
        	deferred.reject(error);
      	else
        	deferred.resolve(projects);
    	});
    	return deferred.promise;
	}

    function FindProjectsByOwner(owner) {
        var deferred = q.defer();
        ProjectModel.find({owner : owner}, function(error, projects) {
        if (error)
            deferred.reject(error);
        else
            deferred.resolve(projects);
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
            email: new_user.email,
            gitusername : new_user.gitusername
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