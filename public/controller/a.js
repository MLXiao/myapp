angular.module('app').controller('a', function($scope, $location, $anchorScroll) {
    $scope.toTop = function() {
        $location.hash('top');
        $anchorScroll();
    };
    $scope.toBottom = function() {
        $location.hash('bottom');
        //$anchorScroll();
    }
});