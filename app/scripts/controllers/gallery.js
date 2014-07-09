

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http, $location) {
    $http.get('/api/getProjectData').success(function(projectData){
        $scope.projectData = projectData;
    });

    $scope.$location = $location;

    var displayProject = function(){
        for(var i = 0; i < $scope.projectData.length; i++){
            if($scope.projectData[i].screenshotLink !== ''){
                return true;
            } else{
                return false;
            }
        }
    }
});

