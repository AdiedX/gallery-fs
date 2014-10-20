

#Fullstack Academy's Projects Gallery


##Bootstrap Grid System
<img src="http://i.imgur.com/Hq0b63y.png">
######HTML
```html
<div class="zn animated fadeIn content col-xs-12 col-sm-12 col-md-6 col-lg-4" ng-class="{'large':inside===true}" ng-repeat="project in projectData | filter: searchFunc" ng-mouseenter="inside=true" ng-mouseleave="inside=false" style="padding: 0px; background-color: black;">
    <div ng-class="{'fixHole': project.screenshotLink === ''}" ng-show="project.screenshotLink !== ''">
        <div class="gallery-row" style="background-image: url('{{project.screenshotLink}}'); background-size: cover; background-repeat: no-repeat; background-position: 50% 0%;" ng-mouseenter="mouseEvent = true" ng-mouseleave="mouseEvent = false" ng-class="{'gallery-info': mouseEvent === true}">
            <div class="overlay" ng-show="mouseEvent === true" ng-click="$location.path('/project/' + project.id)"> <br><br><br><br>
                <h1>{{project.projectName}}</h1>
                <p>{{project.projectPitch}}</p>
            </div>
        </div>
    </div>
</div>
```

######AJAX REQUEST & SEARCH FUNCTIONALITY
```javascript
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
```

##PROJECT PAGE
<img src="http://i.imgur.com/bCed9WE.png">
<img src="http://i.imgur.com/HldZgGB.png">
######API ROUTES
```javascript
app.route('/api/getProjectData').get(api.projectData);
app.route('/api/getProject/:id').get(api.projectFind);
```
######AJAX CALL 
```javascript
app.controller('ProjectCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/getProject/' + $routeParams.id).success(function(projectData){
        $scope.projectData = projectData;
    });
});
```





