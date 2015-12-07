"use strict";

(function() {
  angular
    .module("FormBuilderApp")
    .controller("FieldController", FieldController);
    
  function FieldController($scope, $routeParams, ProjectService) {
  
    var userId = $routeParams.userId;
    var formId = $routeParams.formId;
        
    setProject();
    
    function setProject() {
      ProjectService.findProjectsById(formId).then(function(response) {
        $scope.project = response;
        ProjectService.getGitCommits($scope.project.owner, $scope.project.gitrepo).then(function(res){
          $scope.git_commits = res;
        });
      });
    }
  }
})();