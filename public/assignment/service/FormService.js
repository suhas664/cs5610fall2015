"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .factory("FormService", FormService);

	function FormService() {
		var forms = [];

		var formservice = {
			createFormForUser : createFormForUser,
			findAllFormsForUser : findAllFormsForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};

		return formservice;

		function createFormForUser(user_id, form, callback) {
			form.id = guid();
			form.user_id = user_id;
			forms.push(form);
			callback(form);
		}

		function findAllFormsForUser(user_id, callback) {
			var all_forms = [];
			forms.forEach(function (ele) {
				if (ele.userid === user_id) {
					all_forms.push(ele);
				}
			});
			callback(all_forms);
		}

		function deleteFormById(form_id, callback) {

			forms.forEach(function (ele, index){
				if(ele.id == form_id){
					forms.splice(index, 1);
					callback(forms);
				}
			})
		} 

		function updateFormById(form_id, new_form, callback) {
			forms.forEach(function (ele, index) {
				if (ele.id === form_id) {
					new_form.id = ele.id;
					new_form.user_id = ele.user_id;
					forms.splice(index, 1);
					forms.push(new_form);
					callback(ele);
				}
			})
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
