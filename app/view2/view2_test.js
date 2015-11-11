'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){
    var scope;
    beforeEach(function(){
      scope = {};
    });

    it('should call getFriends on instantiating the controller', inject(function($controller) {
      var mockFriendsService = {
        getFriends : function(callback) {
          callback([{name : 'bob'}])
        }
      };
      spyOn(mockFriendsService, 'getFriends').and.callThrough();
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      expect(mockFriendsService.getFriends).toHaveBeenCalled();
      expect(scope.friends).toContain({name : 'bob'});
    }));

    it('should call getFriends service method from findFriends controller method', inject(function($controller) {
      var mockFriendsService = { getFriends : function() {} };
      spyOn(mockFriendsService, 'getFriends');
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      scope.findFriends();
      expect(mockFriendsService.getFriends).toHaveBeenCalled();
    }));

    it('should call addFriend service method from addFriend controller method', inject(function($controller){
      var mockFriendsService = { getFriends : function() {}, addFriend : function() {} };
      spyOn(mockFriendsService, 'addFriend');
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      scope.addFriend();
      expect(mockFriendsService.addFriend).toHaveBeenCalled();
    }));

    it('should call removeFriend service method from removeFriend controller method', inject(function($controller){
      scope.friends = [ {name : 'bob'} ];
      var callbackWhaaa = function (names) {scope.names = names};
      var mockFriendsService = {
        getFriends: function(callback){
          callback();
        },
        removeFriend : function(callback) {
          getFriends(callback);
        }
      };
      spyOn(mockFriendsService, 'removeFriend').and.callThrough();
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      scope.removeFriend(callbackWhaaa([]));
      expect(mockFriendsService.removeFriend).toHaveBeenCalled();
      expect(scope.friends).not.toContain({name : 'bob'});
    }));

  });
});
