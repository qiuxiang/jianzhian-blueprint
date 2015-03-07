window.views_dir = window.views_dir || 'views'

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
        templateUrl: window.views_dir + '/app/main.html',
        controller: 'Main'
      })
  }])

angular.element(document).ready(function () {
  angular.bootstrap(document, ['app'])
})
