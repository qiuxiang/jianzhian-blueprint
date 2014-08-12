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
