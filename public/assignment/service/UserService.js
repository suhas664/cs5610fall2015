"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("UserService", UserService);


	function UserService() {

		var users = [];

		var userservice = {
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			findAllUsers : findAllUsers,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser
		};

		return userservice;

		function findUserByUsernameAndPassword(username, password, callback) {
			users.forEach(function (ele) {
				if (ele.username === username && ele.password === password) {
					callback(ele);
				}
			})
			return null;
		}

		function findAllUsers(callback) {
			callback(users);
		}

		function createUser(add_user, callback) {
			add_user.id = guid(); 
			users.push(add_user);
			callback(add_user);
		}

		function deleteUserById(user_id, callback) {

			users.forEach(function (ele, index){
				if(ele.id == user_id){
					users.splice(index,1);
					callback(users);
				}
			})
		}

		function updateUser(user_id, user_update, callback) {
			users.forEach(function (ele, index) {
				if (ele.id === user_id) {
					ele.username = user_update.username;
					ele.password = user_update.password;
					ele.firstname = user_update.firstname;
					ele.lastname = user_update.lastname;
					ele.email = user_update.email;
					callback(ele);
				}
			});
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