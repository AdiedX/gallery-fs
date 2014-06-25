'use strict';

angular.module('galleryFsApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
