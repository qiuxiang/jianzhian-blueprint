angular.module('controllers', [])
  .controller('Main', ['$scope', '$http', function ($scope, $http) {
    $scope._ = _
    $scope.defines = {
      blueprint: {
        width: 1140,
        height: 760
      },
      board_types: {
        none: 0,
        window: 1,
        board: 2,
        gate_dual: 3,
        gate_left_left: 4,
        gate_left_right: 5,
        gate_right_left: 6,
        gate_right_right: 7
      },
      aisle_width: 1000, // 走道宽度
      aisle_height: 1000, // 栏杆高度
      stairs_height: 3200, // 楼梯的俯视高度
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
        },
        fireproof: 0,
        gate: 0
      }
    }

    if (typeof window.get_url != 'undefined') {
      $http.get(window.get_url).then(function (response) {
        setMetadata(response.data)
      })
    }

    $scope.$watch('metadata.scale', function () {
      $scope.scaled = {
        K: parseInt($scope.defines.K * $scope.metadata.scale),
        P: parseInt($scope.defines.P * $scope.metadata.scale),
        aisle_width: $scope.defines.aisle_width * $scope.metadata.scale,
        aisle_height: $scope.defines.aisle_height * $scope.metadata.scale,
        stairs_height: $scope.defines.stairs_height * $scope.metadata.scale
      }

      $scope.scaled.width = $scope.metadata.width * $scope.scaled.K
      $scope.scaled.height = $scope.metadata.height * $scope.scaled.K
      $scope.scaled.layer = $scope.metadata.layer * $scope.scaled.P
    })

    $scope.$watch('metadata.height', function () {
      $scope.metadata.height = parseInt($scope.metadata.height)
      $scope.scaled.height = $scope.metadata.height * $scope.scaled.K
      resetRooms()
    })

    $scope.$watch('metadata.width', function () {
      $scope.metadata.width = parseInt($scope.metadata.width)
      $scope.scaled.width = $scope.metadata.width * $scope.scaled.K
      resetRooms()
    })

    $scope.$watch('metadata.layer', function () {
      $scope.metadata.layer = parseInt($scope.metadata.layer)
      $scope.scaled.layer = $scope.metadata.layer * $scope.scaled.P
      resetRooms()

      if ($scope.metadata.layer <= 3) {
        $scope.metadata.options.stairs.left = false
        $scope.metadata.options.stairs.right = false
      }
    })

    $scope.exportMetadataToFile = function (metadata) {
      metadata.rooms = _.map(metadata.rooms, function (layer) {
        return _.map(layer, function (col) {
          return _.map(col, function (room) {
            delete room['$$hashKey']
            return room
          })
        })
      })
      exportFile('metadata.json', JSON.stringify(metadata, null, 2))
    }

    $scope.saveMetadata = function (metadata) {
      if (typeof window.post_url != 'undefined') {
        $http.post(window.post_url, metadata).then(function () {
          console.log(true)
        }, function () {
          console.log(false)
        })
      }
    }

    $scope.importMetadata = function (metadata) {
      setMetadata(JSON.parse(metadata))
    }

    function setMetadata(metadata) {
      $scope.metadata = _.cloneDeep(metadata)
      setTimeout(function () {
        $scope.metadata.rooms = _.cloneDeep(metadata.rooms)
        $scope.$apply()
      }, 1000)
    }

    function resetRooms() {
      $scope.metadata.rooms = _.map(_.range(3, Number($scope.metadata.layer) + 1, 3), function () {
        return  _.map(_.range(0, $scope.metadata.width), function (w) {
          return  _.map(_.range(0, $scope.metadata.height), function (h) {
            var room = {
              left: $scope.defines.board_types.none,
              right: $scope.defines.board_types.none,
              front: $scope.defines.board_types.none,
              back: $scope.defines.board_types.none,
              middle: $scope.defines.board_types.none
            }

            if (w == 0) {
              room.left = $scope.defines.board_types.board
            }

            if (h == 0) {
              room.back = w % 2 ? $scope.defines.board_types.board : $scope.defines.board_types.window
            }

            if (h == $scope.metadata.height - 1) {
              room.front = w % 2 ? $scope.defines.board_types.gate_right_right : $scope.defines.board_types.window
            }

            room.right = w % 2 ? $scope.defines.board_types.board : $scope.defines.board_types.none
            return room
          })
        })
      })
    }

    function exportFile(fileName, content) {
      var anchor = document.createElement('a')
        , blob = new Blob([content])
        , event = document.createEvent('HTMLEvents')

      event.initEvent('click', false, false)
      anchor.download = fileName
      anchor.href = URL.createObjectURL(blob)
      anchor.dispatchEvent(event)
    }
  }])
