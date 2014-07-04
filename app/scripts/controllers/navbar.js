

'use strict';

angular.module('galleryFsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/main');
      });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
