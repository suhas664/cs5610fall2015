"use strict";

(function(){
	angular.module("FormBuilderApp")
	  .controller("FormController", FormController);

	function FormController($rootScope, $scope, FormService, $location) {
		
		var user_id = $rootScope.currentUser.id;
		$scope.new_form = {};
		//console.log("Controller init");
		FormService.findAllFormsForUser(user_id).then(function(forms){
			$scope.forms = forms;
		});

		$scope.addForm = function() {
			//console.log("Called Add forms in controller")
			FormService.createFormForUser(user_id, $scope.new_form).then(function(form) {
				$scope.forms.push(form);
				$scope.new_form = {};
			});
		}

		$scope.updateForm = function() {
			//console.log("Called Update form in controller")
			if ($scope.selectedForm) {
				FormService.updateFormById($scope.selectedForm._id, $scope.new_form).then (function(form) {
					FormService.findAllFormsForUser(user_id).then(function(forms){
						$scope.forms = forms;
				});
			});
		}}

		$scope.deleteForm = function(index) {
			FormService.deleteFormById($scope.forms[index]._id).then(function(forms){
				$scope.forms.splice(index, 1);
			});
		}

		$scope.selectForm = function(index) {
			$scope.selectedForm = $scope.forms[index];
			$scope.new_form.name = $scope.selectedForm.name;
		}

		$scope.navigate = function(index) {
			//console.log("navigate is getting called")
			var url = "/user/" + user_id + "/form/" + $scope.forms[index]._id + "/fields";
			//console.log(url);
			$location.path(url);
		}

	}
})();