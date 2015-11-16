"use strict";

var users = require("./user.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {
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
		user.id = uuid.v1();
		users.push(user);
		return user;
	}

	function FindAll() { 
		return users; 
	}

	function FindById(id) {
		for (var i = 0; i < users.length; i++) {
            if (users.id == id)
                return users[i];
        }
        return null;
	}

	function FindUserByUsername(username) {
		for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                return users[i];
            }
        }
        return null;
	}

    function FindUserByCredentials(credentials) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password)
                return users[i];
        }
        return null;
    }

	function Update(id, new_usew) {
		var user = FindById(id);
		console.log("Called Update");
		for(var i in new_user) {
			user[i] = new_user[i];
		}
		return users;
	}

	function Delete(id) {
		var i = users.findIndex(function (item, i, array) {
			return item.id === id;
		});
		if (i != -1) {
			users.splice(i, 1);
		}
		return users;
	}

};