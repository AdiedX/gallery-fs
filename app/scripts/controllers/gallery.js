

'use strict';

var app = angular.module('galleryFsApp');

app.controller('GalleryCtrl', function ($scope, $http, $location) {
    $http.get('/api/getProjectData').success(function(projectData){
        $scope.projectData = projectData;
    });
    $scope.search = '';
    $scope.$location = $location;
    $scope.searchFunc = function(proj){
        var lowerInput = $scope.search.toLowerCase();
        // Create boolean value:
        var text_val = true;
        var tech_tags = proj.techTags.join('');
        var devs = proj.developers.join('');
        var proj_text = ('' + proj.projectName + proj.description + proj.pitch + tech_tags + devs).toLowerCase();
        if(lowerInput.length > 0){
            if(proj_text.indexOf(lowerInput) > -1){
                console.log(proj);
                text_val = true;
            } else{
                text_val = false;
            }
        }

        return text_val;
    }
    $scope.$watch('search', function(newval, oldval) {
        $scope.$emit('iso-method', {name:null, params:null});
    });
});

