

'use strict';

var app = angular.module('galleryFsApp');

app.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/getProjectData').success(function(projectData){
      $scope.projectData = projectData;
    });
});

