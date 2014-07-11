

'use strict';

var app = angular.module('galleryFsApp');

app.controller('ProjectCtrl', function ($scope, $http, $routeParams) {
    // alert($routeParams.id);
    $http.get('/api/getProject/' + $routeParams.id).success(function(projectData){
        $scope.projectData = projectData;
    });
});

// app.directive('image', function(){
//     return {
//         restrict: 'E',
//         controller:
//     };
// });

