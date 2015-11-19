"use strict";

(function(){

	angular
	  .module("FormBuilderApp")
	  .controller("ProfileController", ProfileController);

	function ProfileController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		$scope.user = $rootScope.currentUser;
		
		$scope.update = function() {
			UserService.updateUser($scope.user.id, $scope.user).then (function(user)
			{
				for(var i in user)
				{
					$scope.user[i] = user[i];
				}
			});
		}
	}
})();