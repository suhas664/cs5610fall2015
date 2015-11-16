"use strict";

(function(){
	angular.module("FormBuilderApp")
	  .controller("FormController", FormController);

	function FormController($rootScope, $scope, FormService) {
		
		var user_id = $rootScope.currentUser.id;
		$scope.new_form = {};

		FormService.findAllFormsForUser(user_id, function(forms){
			$scope.forms = forms;
		});

		$scope.addForm = function() {
			FormService.createFormForUser(user_id, $scope.new_form, function(form) {
				$scope.forms.push(form);
				$scope.new_form = {};
			});
		}

		$scope.updateForm = function() {
			if ($scope.selectedForm) {
				FormService.updateFormById($scope.selectedForm.id, $scope.new_form, function(form) {});
			}
		}

		$scope.deleteForm = function(index) {
			FormService.deleteFormById($scope.forms[index].id, function(forms){
				$scope.forms.splice(index, 1);
			});
		}

		$scope.selectForm = function(index) {
			$scope.selectedForm = $scope.forms[index];
			$scope.new_form.name = $scope.selectedForm.name;
		}

	}
})();