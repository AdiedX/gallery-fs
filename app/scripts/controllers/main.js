

'use strict';

var app = angular.module('galleryFsApp');

app.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
});

app.directive('turnred', function() {
    return function(scope, element) {
        element.bind('mouseover', function(){
            element.addClass('turn-red');
        });
        element.bind('mouseleave', function() {
            element.removeClass('turn-red');
        });
    };
});
