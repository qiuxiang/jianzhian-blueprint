angular.module('controllers', [])
  .controller('Main', ['$scope', '$http', function ($scope, $http) {
    $scope._ = _
    $scope.defines = {
      blueprint: {
        width: 1046,
        height: 736
      },
      board_types: {
        none: 0,
        window: 1,
        window_half_left: 10,
        window_half_right: 11,
        board: 2,
        board_half_left: 20,
        board_half_right: 21,
        gate_dual: 3,
        gate_left_left: 4,
        gate_left_right: 5,
        gate_right_left: 6,
        gate_right_right: 7,
        gate_left_left_no_border: 40,
        gate_left_right_no_border: 50,
        gate_right_left_no_border: 60,
        gate_right_right_no_border: 70
      },
      aisle_width: 1000, // 走道宽度
      aisle_height: 1000, // 栏杆高度
      stairs_height: 3200, // 楼梯的俯视高度
      K: 1820,
      P: 950
    }

    $scope.metadata = {
      width: 4,
      height: 3,
      layer: 6,
      scale: 0.04,
      options: {
        stairs: {
          left: true,
          right: false,
          front_left: false,
          front_right: false
        },
        fireproof: 0,
        gate_type: 0,
        board_type: 0,
        tile_type: 0,
        tile_class: 0,
        has_awning: 0,
        awning_type: 0,
        display: 0
      },
      copy: {
        base: 2,
        count: 1
      }
    }

    if (typeof window.get_url != 'undefined') {
      $http.get(window.get_url).then(function (response) {
        setMetadata(response.data)
      })
    }

    $scope.$watch('metadata.options.stairs', function () {
      $scope.has_front_stairs = $scope.metadata.options.stairs.front_left || $scope.metadata.options.stairs.front_right
    }, true)

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

    $scope.$watch('metadata.copy', function () {
      $scope.metadata.width = $scope.metadata.copy.base * $scope.metadata.copy.count
      $scope.metadata.rooms = _.map($scope.metadata.rooms, function (layer) {
        return  _.map(_.range(0, $scope.metadata.width), function (row) {
          return  _.map(_.range(0, $scope.metadata.height), function (h) {
            var w = row % $scope.metadata.copy.base
              , room = _.cloneDeep(layer[w][h])

            if (w == 0 && row != 0) {
              //room.left = $scope.defines.board_types.none
            }

            return room
          })
        })
      })
    }, true)

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
      if ($scope.metadata.rooms &&
          $scope.metadata.width == $scope.metadata.rooms[0].length &&
          $scope.metadata.height == $scope.metadata.rooms[0][0].length &&
          $scope.metadata.layer == $scope.metadata.rooms.length * 3) {
        return
      }

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

      $scope.metadata.copy = {
        base: $scope.metadata.width,
        count: 1
      }
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
