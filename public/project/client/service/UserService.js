"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("UserService", UserService);


	function UserService($http, $q) {

		var userservice = {
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			findAllUsers : findAllUsers,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser
		};

		return userservice;

		function findUserByUsernameAndPassword(username, password) {
			var deferred = $q.defer();
			$http.get('/api/assignment/user?username='+username+'&password='+password)
			   .success(function(response) {
			   	   deferred.resolve(response);
			   });
			return deferred.promise;
		}

		function findAllUsers() {
			var deferred = $q.defer();
			$http.get('/api/assignment/user')
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function createUser(add_user) {
			var deferred = $q.defer();
			$http.post('/api/assignment/user', add_user)
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