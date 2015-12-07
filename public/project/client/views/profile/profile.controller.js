"use strict";

(function(){

	angular
	  .module("FormBuilderApp")
	  .controller("ProfileController", ProfileController);

	function ProfileController($rootScope, $scope, $location, UserService, ProjectService) {
		$scope.$location = $location;
		$scope.user = $rootScope.currentUser;

		ProjectService.findProjectsByOwner($scope.user.gitusername).then(function(projects){
			$scope.projects = projects;
		});
		
		$scope.update = function() {
			UserService.updateUser($scope.user.id, $scope.user).then (function(user)
			{
				for(var i in user)
				{
					$scope.user[i] = user[i];
				}
			});
		}

		$scope.navigate = function(index) {
			var user_id = $scope.user._id;
			//console.log("navigate is getting called")
			var url = "/user/" + user_id + "/form/" + $scope.projects[index]._id + "/fields";
			//console.log(url);
			$location.path(url);
		}
	}
})();