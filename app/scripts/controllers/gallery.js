

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http) {
    $scope.images = [
        'images/wall-pearl-1.jpg',
        'images/manhattan-1.jpg',
        'images/stone-st-1.jpg',
        'images/broad-st-1.jpg',
        'images/brooklyn-1.jpg',
        'images/wall-pearl-1.jpg',
        'images/broad-st-2.jpg',
    ];
});