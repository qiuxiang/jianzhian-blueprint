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
        $scope.clicked = function (room) {
          $('#modal-flat').modal('show')
          console.log(room)
        }
        $scope.$attrs = $attrs
        console.log($scope)
      }]
    }
  })
