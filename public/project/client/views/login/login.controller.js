"use strict";

(function(){
	angular
	  .module("FormBuilderApp")
	  .controller("LoginController", LoginController);

	function LoginController($rootScope, $scope, $location, UserService) {
		$scope.$location = $location;
		
		$scope.login = function() {
			UserService.findUserByUsernameAndPassword(
				$scope.user.username, 
				$scope.user.password).then(function(user) {
					if(user != null){
					$rootScope.currentUser = user;
					$location.url('/profile');
					}
					else{
						$location.url('/home');
						alert("Invalid Credentials ! First Time Users Please Sign up !");
					}
				});
		}
	}
})();