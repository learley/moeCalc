'use strict';

angular.module('moeCalcApp')
.service('itemLoader', ["$http", function($http) {
  // this.getItems = function(callback) {
  //   $http.get('data/items.json').then(callback);
  // };
  
}])
.service('dataService', ['$http', function($http) {
  this.getItems = function(callback) {
    $http.get('data/items.json').then(callback);
  };
}]);