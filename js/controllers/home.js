'use strict';

angular.module('moeCalcApp')
.controller('homeCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  // $scope.getItems = 
  
  dataService.getItems(function(response) {
    $scope.items = response.data
  });
    
}])
.controller('craftCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('inventoryCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('equipCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('aboutCtrl', ['$scope', 'dataService', function($scope, dataService) {}]);