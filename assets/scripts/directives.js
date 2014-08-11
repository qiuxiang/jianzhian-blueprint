angular.module('directives', [])
  .directive('blueprintFoundation', function () {
    return {
      restrict: 'E',
      scope: {
        width: '@',
        height: '@',
        scale: '@'
      },
      templateUrl: 'views/directives/blueprints/foundation.html',
      controller: ['$scope', function ($scope) {
        $scope.$watch('width', calculate)
        $scope.$watch('height', calculate)
        $scope.$watch('scale', calculate)

        function calculate() {
          $scope.base_side = parseInt(1820 * $scope.scale)
          $scope.base_width = $scope.width * $scope.base_side
          $scope.base_height = $scope.height * $scope.base_side

          $scope.outer_diff = parseInt(380 * $scope.scale)
          $scope.outer_width = $scope.base_width + $scope.outer_diff
          $scope.outer_height = $scope.base_height + $scope.outer_diff

          $scope.center_diff = parseInt(80 * $scope.scale)
          $scope.center_offset = parseInt(($scope.outer_diff - $scope.center_diff) / 2)
          $scope.center_width = $scope.base_width + $scope.center_diff
          $scope.center_height = $scope.base_height + $scope.center_diff

          $scope.inner_diff = parseInt(-220 * $scope.scale)
          $scope.inner_offset = parseInt(($scope.outer_diff - $scope.inner_diff) / 2)
          $scope.inner_width = $scope.base_width + $scope.inner_diff
          $scope.inner_height = $scope.base_height + $scope.inner_diff
        }
      }]
    }
  })
