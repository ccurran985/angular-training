'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){
    var scope;
    beforeEach(function(){
      scope = {};
    });

    it('should call getFriends on instantiating the controller', inject(function($controller) {
      var mockFriendsService = { getFriends : function() {} };
      spyOn(mockFriendsService, 'getFriends');
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      expect(mockFriendsService.getFriends).toHaveBeenCalled();
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

  });
});
