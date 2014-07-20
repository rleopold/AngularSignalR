'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'signalRHubProxy', function ($scope, signalRHubProxy) {
      $scope.name = 'Richard';
      $scope.messages = [];

      var helloHubProxy = signalRHubProxy("helloHub");

      helloHubProxy.on('hello', function (data) {
          $scope.messages.push(data);
      });

      //start proxy after subscribes, that weird??
      helloHubProxy.connection.start();

      $scope.sayHello = function () {
          helloHubProxy.invoke('Hello', $scope.name, function (data) {
              console.log('invoked Hello');
          });
      }

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
