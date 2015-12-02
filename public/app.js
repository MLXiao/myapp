angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

var app = angular.module('app', ['ui.router']);

app.config(function() {

});

app.controller('myCtrl', function($scope, $http) {
    $scope.foo = 'hello, world!';
});