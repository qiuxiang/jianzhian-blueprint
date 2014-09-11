;(function () {
  window.views_dir = window.views_dir || 'views'

  var foundationCtrl = ['$scope', function ($scope) {
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
    , flatCtrl = ['$scope', '$attrs', function ($scope, $attrs) {
      $scope._ = _
      $scope.metadata = $scope.$parent.metadata
      $scope.defines = $scope.$parent.defines
      $scope.attrs = $attrs
      $scope.clicked = function (room, w, h) {
        var board_types = {}
        board_types[$scope.defines.board_types.none] = '无'
        board_types[$scope.defines.board_types.board] = '墙'
        board_types[$scope.defines.board_types.window] = '窗'
        board_types[$scope.defines.board_types.gate_dual] = '双开门'
        board_types[$scope.defines.board_types.gate_left_left] = '左侧左开门'
        board_types[$scope.defines.board_types.gate_left_right] = '左侧右开门'
        board_types[$scope.defines.board_types.gate_right_left] = '右侧左开门'
        board_types[$scope.defines.board_types.gate_right_right] = '右侧右开门'

        $scope.$parent.room_options = {
          middle: _.clone(board_types),
          right: _.clone(board_types),
          front: _.clone(board_types),
          back: _.clone(board_types)
        }

        if (h != 0) {
          delete $scope.$parent.room_options.back
        }

        $('#modal-flat').modal('show')
        setTimeout(function() {
          $scope.$parent.$apply(function () {
            $scope.$parent.room = room
          })
        }, 100)
      }
    }]

  angular.module('directives', [])
    .directive('blueprintSimpleFoundation', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/simple/foundation.html',
        controller: foundationCtrl
      }
    })
    .directive('blueprintCompleteFoundation', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/complete/foundation.html',
        controller: foundationCtrl
      }
    })
    .directive('blueprintSimpleSide', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/simple/side.html'
      }
    })
    .directive('blueprintCompleteSide', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/complete/side.html'
      }
    })
    .directive('blueprintSimpleFront', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/simple/front.html'
      }
    })
    .directive('blueprintCompleteFront', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/complete/front.html'
      }
    })
    .directive('blueprintSimpleFlat', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/simple/flat.html',
        controller: flatCtrl
      }
    })
    .directive('blueprintCompleteFlat', function () {
      return {
        restrict: 'E',
        templateUrl: window.views_dir + '/directives/blueprints/flat.html',
        controller: flatCtrl
      }
    })
})()
