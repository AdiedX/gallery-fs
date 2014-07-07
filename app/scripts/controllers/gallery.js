

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http) {
    $http.get('/api/getProjectData').success(function(projectData){
        $scope.projectData = projectData;
    });
    // $scope.projects = [
    //     {
    //         imageUrl:'images/wall-pearl-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/manhattan-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/stone-st-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/broad-st-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/brooklyn-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/wall-pearl-1.jpg'
    //     },
    //     {
    //         imageUrl:'images/broad-st-2.jpg'
    //     }
    // ];
});