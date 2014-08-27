angular.module('directives', [])
  .directive('blueprintBaseFoundation', function () {
    return {
      templateUrl: 'views/directives/blueprints/base/foundation.html',
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
          $scope.inner.height = $scope.inner.height < 0 ? 0 : $scope.inner.height
        }
      }]
    }
  })
  .directive('blueprintSimpleFoundation', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/simple/foundation.html'
    }
  })
  .directive('blueprintCompleteFoundation', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/complete/foundation.html'
    }
  })
  .directive('blueprintBaseSide', function () {
    return {
      templateUrl: 'views/directives/blueprints/base/side.html'
    }
  })
  .directive('blueprintSimpleSide', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/simple/side.html'
    }
  })
  .directive('blueprintCompleteSide', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/complete/side.html'
    }
  })
  .directive('blueprintBaseFront', function () {
    return {
      templateUrl: 'views/directives/blueprints/base/front.html'
    }
  })
  .directive('blueprintSimpleFront', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/simple/front.html'
    }
  })
  .directive('blueprintCompleteFront', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/complete/front.html'
    }
  })
  .directive('blueprintBaseFlat', function () {
    return {
      templateUrl: 'views/directives/blueprints/base/flat.html',
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        $scope._ = _
        $scope.metadata = $scope.$parent.metadata
        $scope.defines = $scope.$parent.defines
        $scope.attrs = $attrs
        $scope.clicked = function (room) {
          $('#modal-flat').modal('show')
          $scope.$parent.room = room
          console.log($scope.$parent.metadata)
        }
      }]
    }
  })
  .directive('blueprintSimpleFlat', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/simple/flat.html'
    }
  })
  .directive('blueprintCompleteFlat', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/blueprints/flat.html',
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        $scope._ = _
        $scope.metadata = $scope.$parent.metadata
        $scope.defines = $scope.$parent.defines
        $scope.attrs = $attrs
        $scope.clicked = function (room) {
          $('#modal-flat').modal('show')
          $scope.$parent.room = room
          console.log($scope.$parent.metadata)
        }
      }]
    }
  })
