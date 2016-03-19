angular.module('moeCalcApp', ['ngRoute', 'ngStorage'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
    .when('/craft', {
      templateUrl: 'templates/craft.html',
      controller: 'craftCtrl'
    })
    .when('/inventory', {
      templateUrl: 'templates/inventory.html',
      controller: 'inventoryCtrl'
    })
    .when('/equip', {
      templateUrl: 'templates/equip.html',
      controller: 'equipCtrl'
    })
    .when('/about', {
      templateUrl: 'templates/about.html',
      controller: 'aboutCtrl'
    })
    .otherwise({
       redirectTo: '/'
    });
}]);