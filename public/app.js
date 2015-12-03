angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

var app = angular.module('app', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/a");
    $stateProvider.state('a', {
        url: '/a',
        templateUrl: 'view/a.html',
        controller: 'a'
    }).state('b', {
        url: '/b',
        templateUrl: 'view/b.html'
    }).state('c', {
        url: '/c',
        templateUrl: 'view/c.html'
    }).state('c.a', {
        url: '/a',
        templateUrl: 'view/ca.html'
    }).state('c.b', {
        url: '/b',
        templateUrl: 'view/cb.html'
    }).state('c.d', {
        url: '/:id',
        templateUrl: 'view/cd.html',
        controller: function($scope, $state, simpleObj, promiseObj) {

        },
        resolve: {
            simpleObj: function() {
                return {value: 'simple!'};
            },
            promiseObj:  function($q, $timeout){
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve();
                }, 2000);
                return deferred.promise;
            }
        }
    });
}).run(function() {
    //console.log('run');
});

