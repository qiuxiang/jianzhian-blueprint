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
  .filter('letter', function () {
    return function (number) {
      return String.fromCharCode(65 + number)
    }
  })
