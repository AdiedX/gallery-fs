

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
});