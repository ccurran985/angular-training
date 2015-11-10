'use strict';

describe('myApp.view2 module', function() {

  var $locationWithSpy,
  loginService,
  httpBackend;

  beforeEach(function(){
    module('myApp.view1', function($provide){
      $locationWithSpy = { path: function(){} };
      spyOn($locationWithSpy, 'path');
      $provide.value('$location', $locationWithSpy);
    });

    inject(function(_$httpBackend_, _loginService_){
      loginService = _loginService_;
      httpBackend = _$httpBackend_;
    });

  }); //end of beforeEach

  //defining a test suite
  describe('view1 controller', function(){

    it('controller should call the loginService.sendLoginDetails function',
    inject(function($controller, $httpBackend, loginService) {
      //Mock Scope; Empty Object
      var scope = { username: 'admin', password: 'password' };
      //Dependencies
      var dependencies = { $scope: scope, loginService: {}  }; // empty object
      //Mocked out controller
      var view1Ctrl = $controller('View1Ctrl', dependencies);
      //check to see sendLoginDetails was called
      spyOn(loginService, 'sendLoginRequest');
    }));//end of test

  }); //end of view1 Controller test suite

  describe('loginService', function() {

    it('should redirect on successful login', function() {
      httpBackend.whenPOST('http://localhost:8080/login').respond(204, '');

      loginService.sendLoginRequest('admin', 'password');
      httpBackend.flush();

      expect($locationWithSpy.path).toHaveBeenCalledWith('/view2');
    });// end of redirect test

  }); //end of login service test suite

}); //end of module test suite
