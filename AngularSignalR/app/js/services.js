'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('myApp.services', []).
  value('version', '0.1');

//DI server location?
app.value('signalRServer', 'http://localhost:8393')

app.factory('signalRHubProxy', ['$rootScope', 'signalRServer',
    function ($rootScope, signalRServer) {
        function signalRHubProxyFactory(hubName, startOptions) {
            var connection = $.hubConnection(signalRServer);
            var proxy = connection.createHubProxy(hubName);


            return {
                on: function (eventName, callback) {
                    proxy.on(eventName, function (result) {
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });

                },
                off: function (eventName, callback) {
                    proxy.off(eventName, function (result) {
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback(result);
                            }
                        });
                    });
                },
                invoke: function (methodName, args, callback) {
                    proxy.invoke(methodName, args)
                        .done(function (result) {
                            $rootScope.$apply(function () {
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                },
                connection: connection
            };
        };

        return signalRHubProxyFactory;
    }]);