"use strict";

module.exports = function(app, model) {
	app.post('/api/assignment/user', function(req, res) {
		res.json(model.Create(req.body));
	});

	app.get('/api/assignment/user', function(req, res) {
		
		var username = req.param('username');
		var password = req.param('password');

		if(username == null && password == null) {
			res.json(model.FindAll());
			return;
		} 
		if (password == null) {
			res.json(model.FindUserByUsername(username));
			return;
		} 
		res.json(model.FindUserByCredentials({
			username: username,
			password: password
		}));
	});

	app.get('/api/assignment/user/:id', function(req, res) {
		res.json(model.FindById(req.params.id));
	});

	app.put('/api/assignment/user/:id', function(req, res) {
		res.json(model.Update(req.params.id, req.body));
	});

	app.delete('/api/assignment/user/:id', function(req, res){
		res.json(model.Delete(req.params.id));
	});
};