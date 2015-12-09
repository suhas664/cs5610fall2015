"use strict";

(function(){

	angular
	  .module("FormBuilderApp")
	  .controller("ProposeController", ProposeController);

	function ProposeController($rootScope, $scope, $location, ProjectService) {
		$scope.$location = $location;
		$scope.user = {};

		$scope.propose = function() {
			$scope.project.owner = $rootScope.currentUser.gitusername;
			ProjectService.createProject($scope.project).then(function(new_project){
				$location.url('/form');
			});
		}
	}
})();