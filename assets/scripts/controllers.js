angular.module('controllers', [])
  .controller('Main', ['$scope', function ($scope) {
    $scope.defines = {
      blueprint: {
        width: 1200,
        height: 800
      },
      K: 1820,
      P: 950
    }

    $scope.metadata = {
      width: 10,
      height: 3,
      layer: 6,
      scale: 0.04,
      merges: [],
      options: {
       stairs: {
         left: true,
         right: false
       }
      }
    }

    $scope.$watch('metadata.width', resetRooms)
    $scope.$watch('metadata.layer', resetRooms)

    function resetRooms() {
      $scope.rooms = []
    }
  }])
