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
  .run(['$rootScope', function ($scope) {
    $scope.kx = 1820
  }])

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app'])
})
