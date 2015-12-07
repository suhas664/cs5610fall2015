"use strict";

module.exports = function(app, model) {
	app.get('/api/assignment/form/:formId/field', function(req, res) {
		var form_id = req.params.formId;
		model
            .FindFormById(form_id)
            .then(function(form) {
                res.json(form.fields);
            });
	});

	app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res){
			var form_id = req.params.formId;
			var field_id = req.params.fieldId;
			model
            .FindFieldById(form_id,field_id)
            .then(function(field) {
                res.json(field);
            });
		});

	app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
			var form_id = req.params.formId;
			var field_id = req.params.fieldId;
			model
	            .DeleteFormField(form_id, field_id)
	            .then(function(uform) {
                	res.json(uform);
            });
		});

	app.post('/api/assignment/form/:formId/field', function(req, res) {
		var form_id = req.params.formId;
		model
            .AddField(form_id, req.body)
            .then(function(uform) {
                res.json(uform);
            });
	});

	app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
		var form_id = req.params.formId;
		var field_id = req.params.fieldId;
		model
            .UpdateField(req.params.form_id, req.params.field_id, req.body)
            .then(function(uform) {
                res.json(uform);
            });
		});
}