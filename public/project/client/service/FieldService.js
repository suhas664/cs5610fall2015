"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("FieldService", FieldService);

	function FieldService($http, $q) {

		var service = {
			createFieldForForm: createFieldForForm,
			getFieldsForForm: getFieldsForForm,
			getFieldForForm: getFieldForForm,
			deleteFieldFromForm: deleteFieldFromForm,
			updateField: updateField
		};

		return service;

		function createFieldForForm(form_id, field) {
			var deferred = $q.defer();
			$http.post('/api/assignment/form/'+form_id+'/field', field)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function getFieldsForForm(form_id) {
			var deferred = $q.defer();
			$http.get('/api/assignment/form/'+form_id+'/field')
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function getFieldForForm(form_id, field_id) {
			var deferred = $q.defer();
			$http.get('/api/assignment/form/'+form_id+'/field/'+field_id)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}


		function deleteFieldFromForm(form_id, field_id) {
			var deferred = $q.defer();
			$http.delete('/api/assignment/form/'+form_id+'/field/'+field_id)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function updateField(form_id, field_id, field) {
			var deferred = $q.defer();
			$http.put('/api/assignment/form/'+form_id+'/field'+field_id, field)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}
	}
})();