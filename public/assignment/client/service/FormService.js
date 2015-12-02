"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("FormService", FormService);

	function FormService($http, $q) {
		var forms = [];

		var formservice = {
			createFormForUser : createFormForUser,
			findAllFormsForUser : findAllFormsForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};

		return formservice;

		function createFormForUser(user_id, form) {
			//console.log("Post request ");
			//console.log(user_id);
			//console.log(form);
			var deferred = $q.defer();
			$http.post('/api/assignment/user/'+user_id+'/form', form)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function findAllFormsForUser(user_id) {
			//console.log(user_id);
			var deferred = $q.defer();
			$http.get('/api/assignment/user/'+user_id+'/form')
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function deleteFormById(form_id) {
			//console.log("Form serivice delete");
			var deferred = $q.defer();
			$http.delete('/api/assignment/form/'+form_id)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
		}

		function updateFormById(form_id, new_form) {
			//console.log(form_id);
			//console.log(new_form);
			var deferred = $q.defer();
			$http.put('/api/assignment/form/'+form_id, new_form)
			    .success(function(response) {
			    	deferred.resolve(response);
			    });
			return deferred.promise;
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
