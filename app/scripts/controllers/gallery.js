

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http, $location) {
    $http.get('/api/getProjectData').success(function(projectData){
        $scope.projectData = projectData;
    });

    $scope.$location = $location;
});