angular.module('controllers', [])
  .controller('Main', ['$scope', function ($scope) {
    $scope.defines = {
      blueprint: {
        width: 1140,
        height: 760
      },
      board_types: {
        window: 1,
        gate: 2,
        board: 3
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
        return  _.map(_.range(0, $scope.metadata.width), function (i) {
          return {
            front: i % 2 ? $scope.defines.board_types.gate : $scope.defines.board_types.window,
            back: i % 2 ? $scope.defines.board_types.board : $scope.defines.board_types.window,
            board: i % 2 == 1
          }
        })
      })
    }
  }])
