angular
  .module('app', [
    'ngRoute',
    'controllers',
    'directives',
    'services',
    'filters'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/app/main.html',
        controller: 'Main'
      })
  }])

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app'])
})

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

angular.module('directives', [])
  .directive('blueprintFoundation', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/foundation.html',
      controller: ['$scope', function ($scope) {
        $scope.$watch('metadata.width', calculate)
        $scope.$watch('metadata.height', calculate)
        $scope.$watch('metadata.scale', calculate)

        function calculate() {
          $scope.outer = { diff: parseInt(380 * $scope.metadata.scale) }
          $scope.outer.width = $scope.scaled.width + $scope.outer.diff
          $scope.outer.height = $scope.scaled.height + $scope.outer.diff

          $scope.center = { diff: parseInt(80 * $scope.metadata.scale) }
          $scope.center.offset = parseInt(($scope.outer.diff - $scope.center.diff) / 2)
          $scope.center.width = $scope.scaled.width + $scope.center.diff
          $scope.center.height = $scope.scaled.height + $scope.center.diff

          $scope.inner = { diff: parseInt(-220 * $scope.metadata.scale) }
          $scope.inner.offset = parseInt(($scope.outer.diff - $scope.inner.diff) / 2)
          $scope.inner.width = $scope.scaled.width + $scope.inner.diff
          $scope.inner.height = $scope.scaled.height + $scope.inner.diff
        }
      }]
    }
  })
  .directive('blueprintSide', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/side.html',
      controller: ['$scope', function ($scope) {
        ;
      }]
    }
  })
  .directive('blueprintFlat', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/flat.html',
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        $scope.$attrs = $attrs
        $scope.clicked = function (room) {
          $('#modal-flat').modal('show')
          $scope.$parent.room = room
        }
      }]
    }
  })

angular.module('filters', [])
  .filter('t', function () {
    return function (text) {
      var translations = {
        0: '一',
        1: '二',
        2: '三'
      }

      return translations[text]
    }
  })

angular.module('services', [])
