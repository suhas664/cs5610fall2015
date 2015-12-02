"use strict";
var q = require("q");

module.exports = function(app, mongoose) {

	var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);

	var api = {
		CreateForm: CreateForm,
		FindAllForms: FindAllForms,
		FindFormById: FindFormById,
		FindFormByTitle: FindFormByTitle,
		FindFormByUserId: FindFormByUserId,
		FindFieldById: FindFieldById,		
		UpdateForm: UpdateForm,
		DeleteForm: DeleteForm,
		RemoveField: RemoveField,
		AddField: AddField,
		UpdateField: UpdateField
	};

	return api;

	function CreateForm(form, user_id) {
		//console.log("CreateForm called");
		var deferred = q.defer();
        form.userId = user_id;
        form.fields = [];
        FormModel.create(form, function(error, form) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
	}

	function FindAllForms() { 
		//console.log("FindAllForms in model called");
		var deferred = q.defer();
        FormModel.find(function(error, forms) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
	}

	function FindFormById(id) {
		var deferred = q.defer();
        FormModel.findById(id, function(error, form) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
	}

	function FindFormByTitle(title) {
		var deferred = q.defer();
        FormModel.findOne({title: title}, function(error, form) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
	}

	function FindFormByUserId(user_id) {
		var deferred = q.defer();
        FormModel.find({userId: user_id}, function(error, forms) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
	}

	function FindFieldById(form_id, field_id) {
		var deferred = q.defer();
        FormModel.findById(form_id, function(error, form){
            if(error) {
                deferred.reject(error);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == field_id){
                        deferred.resolve(formFields[i]);
                    }
                }
            }
        });
        return deferred.promise;
	}

	function UpdateForm(id, update_form) {
		var deferred = q.defer();
        FormModel.findById(id, function(error, form) {
            if(error) {
                deferred.reject(error);
            } else {
                form.name = update_form.name;
                form.save(function(error, uform) {
                    deferred.resolve(uform);
                });
            }
        });
        return deferred.promise;
	}

	function DeleteForm(id) {
		var deferred = q.defer();
        FormModel.remove({_id:id}, function(error, status) {
            if(error) {
                deferred.reject(error);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
	}

	function RemoveField(form_id, field_id) {
		var deferred = q.defer();
        FormModel.findById(form_id, function(error, form){
            if(error) 
                deferred.reject(error);
            else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == field_id){
                        formFields.splice(i,1);
                    }
                }
                form.fields = formFields;
                form.save(function(error, updatedForm) {
                    if(error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
	}

	function AddField(form_id, add_field) {
        var deferred = q.defer();
        FormModel.findById(form_id, function(error, form) {
            if(error) 
                deferred.reject(error);
            else {
                var formFields = form.fields;
                formFields.push(add_field);
                form.fields = formFields;
                form.save(function(error, document) {
                    if(error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
	}

	function UpdateField(form_id, field_id, update_field) {
		var deferred = q.defer();
        FormModel.findById(form_id, function(error, form){
            if(error)
                deferred.reject(error);
            else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == field_id){
                        formFields[i] = updated_field;
                        break;
                    }
                }
                form.fields = formFields;
                form.save(function(error, updated_form) {
                    if(err) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(updated_form);
                    }
                });
            }
        });
        return deferred.promise;
	}
};