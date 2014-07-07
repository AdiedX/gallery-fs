


'use strict';

var app = angular.module('galleryFsApp');

app.controller('ProjectCtrl', function ($scope, $http) {
    $http.get('/api/getProjectData').success(function(projectData){
      $scope.projectData = projectData;
    });
});