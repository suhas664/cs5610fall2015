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
			console.log("Getting propose project done");
			console.log($scope.project);
			ProjectService.createProject($scope.project).then(function(new_project){
				$location.url('/form');
			});
		}
	}
})();