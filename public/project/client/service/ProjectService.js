"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("ProjectService", ProjectService);


	function ProjectService($http, $q) {

		var userservice = {
			findProjectsByOwner : findProjectsByOwner,
			findAllProjects : findAllProjects,
			findProjectsById : findProjectsById,
			createProject : createProject,
			deleteUserById : deleteUserById,
			getGitCommits : getGitCommits,
			findProjectsByTitle : findProjectsByTitle,
			updateUser : updateUser
		};

		return userservice;

		function findProjectsByOwner(user_gitid) {
			var deferred = $q.defer();
			$http.get('/api/assignment/project/user/'+user_gitid)
			   .success(function(response) {
			   	   deferred.resolve(response);
			   });
			return deferred.promise;
		}

		function findProjectsById(project_id) {
			var deferred = $q.defer();
			$http.get('/api/assignment/project/'+project_id)
			   .success(function(response) {
			   	   deferred.resolve(response);
			   });
			return deferred.promise;
		}

		function findProjectsByTitle(title) {
			var deferred = $q.defer();
			$http.get('/api/assignment/project/title/'+title)
			   .success(function(response) {
			   	   deferred.resolve(response);
			   });
			return deferred.promise;
		}

		function getGitCommits(owner, gitrepo) {
			var deferred = $q.defer();
			$http.get('https://api.github.com/repos/'+owner+'/'+gitrepo+'/commits?per_page=5')
			   .success(function(response) {
			   	   deferred.resolve(response);
			   });
			return deferred.promise;
		}

		function findAllProjects() {
			var deferred = $q.defer();
			$http.get('/api/assignment/project')
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function createProject(add_project) {
			var deferred = $q.defer();
			$http.post('/api/assignment/project', add_project)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function deleteUserById(user_id) {
			var deferred = $q.defer();
			$http.delete('/api/assignment/user/'+user_id)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function updateUser(user_id, user_update) {
			console.log(user_update);
			var deferred = $q.defer();
			$http.put('/api/assignment/user/'+user_id, user_update)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function S4() {
    		return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
		}
		
		function guid(){ 		
			var guid;
			guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
			return guid;
		}

	}
})();

//Referenced : http://guid.us/GUID/JavaScript 
//Used logic to create guid