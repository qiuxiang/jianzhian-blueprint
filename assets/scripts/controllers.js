angular.module('controllers', [])
  .controller('Main', ['$scope', function ($scope) {
    $scope.options = {
      width: 6,
      height: 3,
      layer: 3,
      scale: 0.04
    }
  }])
