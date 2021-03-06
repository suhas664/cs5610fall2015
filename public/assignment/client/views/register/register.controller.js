"use strict";

(function(){

	angular
	  .module("FormBuilderApp")
	  .controller("RegisterController", RegisterController);

	function RegisterController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		$scope.user = {};

		$scope.register = function() {
			console.log("Getting register done");
			UserService.createUser($scope.user).then(function(new_user){
				$rootScope.currentUser = new_user;
				$location.url('/profile');
			});
		}
	}
})();