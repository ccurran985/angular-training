'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.service('friendsService', ['$http', function($http) {
  this.friends = [];
  var self = this;

  this.getFriends = function (updateFriends) {
    $http.get('http://localhost:8910/person').then(
      function(response) {
        updateFriends(response.data);
      },
      function(response) {
        updateFriends([]);
      }
    )
  }

  this.addFriend = function (name, updateFriends) {
    $http.post('http://localhost:8910/person', {name : name})
    .then(
      function() {
        self.getFriends(updateFriends);
      },
      function () {
        // self.getFriends(updateFriends);
      }
    );
  }

  this.removeFriend = function(id, updateFriends) {
    console.log('Deleting friend with: ' + id);
    $http.delete('http://localhost:8910/person/' + id)
    .then(
      function () {
        console.log("Delete call success!")
        self.getFriends(updateFriends);
      },
      function () {
        console.log("Delete call failed!")
      }
    );
  }

}])

.controller('View2Ctrl', ['$scope', 'friendsService', function($scope, friendsService) {


  var updateFriends = function (response) {
    $scope.friends = response;
  }

  friendsService.getFriends(updateFriends);

  $scope.findFriends = function () {
    friendsService.getFriends(updateFriends);
  }

  $scope.addFriend = function () {
    friendsService.addFriend($scope.friendToAdd, updateFriends);
  }

  $scope.removeFriend = function (friend) {
    $scope.canBeRestored = friend.name;
    friendsService.removeFriend(friend.id, updateFriends);
  }

  $scope.removeAllFriends = function() {
    $scope.restoreFriends = $scope.friends;
    $scope.friendsToDelete = $scope.friends;
    for(var i = 0; i < $scope.friendsToDelete.length; i++) {
      friendsService.removeFriend($scope.friendsToDelete[i].id, updateFriends);
    }
  }

  $scope.restoreAllFriends = function() {
    for(var i = 0; i < $scope.restoreFriends.length; i++) {
      friendsService.addFriend($scope.restoreFriends[i].name, updateFriends);
      if(i == $scope.restoreFriends.length - 1) {
        $scope.restoreFriends = [];
      }
    }
  }

  $scope.undoDelete = function() {
    if($scope.canBeRestored != null) {
      friendsService.addFriend($scope.canBeRestored, updateFriends);
    }
    $scope.canBeRestored = null;
  }
}]);
