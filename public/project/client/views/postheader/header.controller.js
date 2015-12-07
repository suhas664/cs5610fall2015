"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .controller("HeaderController", HeaderController);
	function HeaderController($rootScope, $scope, $location) {
		$scope.user = $rootScope.currentUser;
		$scope.$location = $location;
	}
})();
