angular.module('controllers', [])
  .controller('Main', ['$scope', function ($scope) {
    $scope.defines = {
      blueprint: {
        width: 1200,
        height: 800
      },
      board_types: {
        1: '窗',
        2: '门',
        3: '墙'
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

    $scope.$watch('metadata.scale', function () {
      $scope.scaled = { K: parseInt($scope.defines.K * $scope.metadata.scale) }
      $scope.scaled.width = $scope.metadata.width * $scope.scaled.K
      $scope.scaled.height = $scope.metadata.height * $scope.scaled.K
    })

    $scope.$watch('metadata.width', function () {
      resetRooms()
    })

    $scope.$watch('metadata.layer', function () {
      resetRooms()
    })

    function resetRooms() {
      $scope.metadata.rooms = _.map(_.range(3, Number($scope.metadata.layer) + 1, 3), function () {
        console.log($scope)
        return [
          _.map(_.range(0, $scope.metadata.width), function (i) {
            return i % 2 ? 2 : 1
          }),
          _.map(_.range(0, $scope.metadata.width), function (i) {
            return i % 2 ? 3 : 1
          })
        ]
      })
    }
  }])
