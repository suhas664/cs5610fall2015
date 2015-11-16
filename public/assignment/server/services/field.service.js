"use strict";

module.exports = function(app, fmodel) {
	app.get('/api/assignment/form/:formId/field', function(req, res) {
		res.json(fmodel.FindFormById(req.params.formId).fields);
	});

	app.get('/api/assignment/form/:formId/field/:fieldId', 
		function(req, res){
			res.json(fmodel.FindFieldById(req.params.formId, req.params.fieldId));
		});

	app.delete('/api/assignment/form/:formId/field/:fieldId',
		function(req, res) {
			res.json(fmodel.RemoveField(req.params.formId, req.params.fieldId));
		});

	app.post('/api/assignment/form/:formId/field', function(req, res) {
		res.json(fmodel.AddField(req.params.formId, req.body));
	});

	app.put('/api/assignment/form/:formId/field/:fieldId', 
		function(req, res) {
			res.json(fmodel.UpdateField(req.params.formId, req.params.fieldId, req.body));
		});
}