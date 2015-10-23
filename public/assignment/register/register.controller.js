"use strict";

(function(){

	angular
	  .module("FormBuilderApp")
	  .controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		$scope.user = {};

		$scope.register = function() {
			UserService.createUser($scope.user, function(new_user){
				$rootScope.currentUser = new_user;
				$location.url('/profile');
			});
		}
	}
})();