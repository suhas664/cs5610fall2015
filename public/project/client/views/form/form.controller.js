"use strict";

(function(){
	angular.module("FormBuilderApp")
	  .controller("FormController", FormController);

	function FormController($rootScope, $scope, ProjectService, $location) {
		
		var user_id = $rootScope.currentUser.id;
		$scope.new_form = {};
		//console.log("Controller init");
		ProjectService.findAllProjects().then(function(projects){
			$scope.projects = projects;
		});

		$scope.searchProjects = function() {
			var title = $scope.search_query;
			console.log(title);
			ProjectService.findProjectsByTitle(title).then(function(projects) {
				$scope.results = projects;
			});
		}

		$scope.navigate1 = function(index) {
			var url = "/user/" + user_id + "/form/" + $scope.results[index]._id + "/fields";
			$location.path(url);
		}

		$scope.navigate = function(index) {
			//console.log("navigate is getting called")
			var url = "/user/" + user_id + "/form/" + $scope.projects[index]._id + "/fields";
			//console.log(url);
			$location.path(url);
		}

	}
})();