'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.service('loginService', ['$http', '$location', function($http, $location) {
  this.sendLoginRequest = function(username, password) {
    $http.post(
      'http://localhost:8080/login', {username: username, password: password})
      .then(function() {
        $location.path('/view2');
      }, function() {
        console.log('error callback');
      });
    }
  }])

  .controller('View1Ctrl', ['$scope', 'loginService', function($scope, loginService) {
    $scope.sendLoginDetails = function() {
      loginService.sendLoginRequest($scope.username, $scope.password);
    };
  }]);
