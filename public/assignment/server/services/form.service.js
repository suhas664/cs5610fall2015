"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", function(req, res) {
        res.json(model.FindFormByUserId(req.params.userId));
    });

    app.get("/api/assignment/form/:formId", function(req, res) {
        res.json(model.FindFormById(req.params.formId));
    });

    app.delete("/api/assignment/form/:formId", function(req, res) {
        res.json(model.DeleteForm(req.params.formId));
    });

    app.post("/api/assignment/user/:userId/form", function(req, res) {
        var new_form = req.body;
        new_form.userId = Number(req.params.userId);
        res.json(model.CreateForm(new_form));
    });

    app.put("/api/assignment/form/:formId", function(req, res) {
        res.json(model.UpdateForm(req.params.formId, req.body));
    });
}