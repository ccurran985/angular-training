'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 controller', function(){

    it('should call getFriends on instantiating the controller', inject(function($controller) {
      var scope = {};
      var mockFriendsService = { getFriends : function() {} };
      spyOn(mockFriendsService, 'getFriends');
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope, friendsService: mockFriendsService});
      expect(mockFriendsService.getFriends).toHaveBeenCalled();
    }));

  });
});
