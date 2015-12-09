"use strict";

module.exports = function(app, model) {
	app.post('/api/assignment/project', function(req, res) {
		model
			.Create(req.body)
			.then(function(user){
				res.json(user);
			});
	});

	app.get('/api/assignment/project', function(req, res) {
		
		var username = req.param('username');
		var password = req.param('password');

			model
				.FindAll()
				.then(function(users){
					res.json(users)
				});
		});

	app.get('/api/assignment/project/:id', function(req, res) {
		var id = req.params.id;
		model
			.FindById(id)
			.then(function(user){
				res.json(user);
			})
	});

	app.get('/api/assignment/project/user/:userid', function(req, res) {
		var user_id = req.params.userid;
		model
			.FindProjectsByOwner(user_id)
			.then(function(projects){
				res.json(projects)
			})
	});

	app.get('/api/assignment/project/title/:title', function(req, res) {
		var title = req.params.title;
		model
			.FindProjectsByTitle(title)
			.then(function(project){
				res.json(project)
			})
	});

	app.post('/api/assignment/project/:projectid/user/:user', function(req, res) {
		var project_id = req.params.projectid;
		var user =  req.params.user
		model
            .AddUser(project_id, user)
            .then(function(uform) {
                res.json(uform);
            });
	});

	app.post('/api/assignment/project/:projectid/user/:user/delete', function(req, res) {
		var project_id = req.params.projectid;
		var user =  req.params.user
		model
            .DeleteUser(project_id, user)
            .then(function(uform) {
                res.json(uform);
            });
	});

	app.delete('/api/assignment/project/:id', function(req, res){
		var id = req.params.id;
		model
			.Delete(id)
			.then(function(stat){
				res.json(stat);
			})
	});
};