"use strict";

module.exports = function(app, model) {
	app.post('/api/assignment/user', function(req, res) {
		model
			.Create(req.body)
			.then(function(user){
				res.json(user);
			});
	});

	app.get('/api/assignment/user', function(req, res) {
		
		var username = req.param('username');
		var password = req.param('password');

		if(typeof username == 'undefined' && typeof password == 'undefined') {
			model
				.FindAll()
				.then(function(users){
					res.json(users)
				});
		} 
		
		else if (username != null && password != null) {
			var credentials = {
				username : username,
				password : password
			};
			model
				.FindUserByCredentials(credentials)
				.then(function(user){
					res.json(user);
				});
		} 
		else{
			model
				.FindUserByUsername(username)
				.then(function(user){
					res.json(user);
				});
		}
	});

	app.get('/api/assignment/user/:id', function(req, res) {
		var id = req.params.id;
		model
			.FindById(id)
			.then(function(user){
				res.json(user);
			})
	});

	app.put('/api/assignment/user/:id', function(req, res) {
		var id = req.params.id;
		model
			.Update(id, req.body)
			.then(function(user){
				res.json(user)
			})
	});

	app.delete('/api/assignment/user/:id', function(req, res){
		var id = req.params.id;
		model
			.Delete(id)
			.then(function(stat){
				res.json(stat);
			})
	});
};