;(function () {
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
      $scope.metadata = $scope.$parent.$parent.metadata
      $scope.defines = $scope.$parent.$parent.defines
      $scope.has_front_stairs = $scope.$parent.$parent.has_front_stairs
      $scope.attrs = $attrs

      $scope.clicked = function (room, w, h) {
        var board_types = {
          '墙': {},
          '窗': {},
          '左侧左开门': {},
          '左侧右开门': {},
          '右侧左开门': {},
          '右侧右开门': {}
        }
        board_types['墙'][$scope.defines.board_types.board] = '墙'
        board_types['墙'][$scope.defines.board_types.board_half_left] = '左半（窗）'
        board_types['墙'][$scope.defines.board_types.board_half_right] = '右半（窗）'
        board_types['窗'][$scope.defines.board_types.window] = '窗'
        board_types['窗'][$scope.defines.board_types.window_half_left] = '左半（窗）'
        board_types['窗'][$scope.defines.board_types.window_half_right] = '右半（窗）'
        board_types['左侧左开门'][$scope.defines.board_types.gate_left_left] = '带墙（左侧左开门）'
        board_types['左侧左开门'][$scope.defines.board_types.gate_left_left_no_border] = '无墙（左侧左开门）'
        board_types['左侧右开门'][$scope.defines.board_types.gate_left_right] = '带墙（左侧右开门）'
        board_types['左侧右开门'][$scope.defines.board_types.gate_left_right_no_border] = '无墙（左侧右开门）'
        board_types['右侧左开门'][$scope.defines.board_types.gate_right_left] = '带墙（右侧左开门）'
        board_types['右侧左开门'][$scope.defines.board_types.gate_right_left_no_border] = '无墙（右侧左开门）'
        board_types['右侧右开门'][$scope.defines.board_types.gate_right_right] = '带墙（右侧右开门）'
        board_types['右侧右开门'][$scope.defines.board_types.gate_right_right_no_border] = '无墙（右侧右开门）'

        $scope.$parent.$parent.room_options = {
          middle: _.clone(board_types),
          right: _.clone(board_types),
          front: _.clone(board_types),
          back: _.clone(board_types)
        }

        if (h != 0) {
          delete $scope.$parent.$parent.room_options.back
        }

        if ($scope.rooms.indexOf(w) == 0) {
          $scope.$parent.$parent.room_options.left = _.clone(board_types)
        }

        $('#modal-flat').modal('show')
        setTimeout(function() {
          $scope.$parent.$parent.$apply(function () {
            $scope.$parent.$parent.room = room
          })
        }, 100)
      }
    }]

  angular.module('directives', [])
    .directive('blueprintSimpleFoundation', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/simple/foundation.html',
        controller: foundationCtrl
      }
    })
    .directive('blueprintCompleteFoundation', function () {
      return {
        restrict: 'E,A,A',
        templateUrl: window.views_dir + '/directives/blueprints/complete/foundation.html',
        controller: foundationCtrl
      }
    })
    .directive('blueprintSimpleSide', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/simple/side.html'
      }
    })
    .directive('blueprintCompleteSide', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/complete/side.html'
      }
    })
    .directive('blueprintSimpleFront', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/simple/front.html'
      }
    })
    .directive('blueprintCompleteFront', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/complete/front.html'
      }
    })
    .directive('blueprintSimpleFlat', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/simple/flat.html',
        controller: flatCtrl
      }
    })
    .directive('blueprintCompleteFlat', function () {
      return {
        restrict: 'E,A',
        templateUrl: window.views_dir + '/directives/blueprints/complete/flat.html',
        controller: flatCtrl
      }
    })
})()
