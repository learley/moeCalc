'use strict';

angular.module('moeCalcApp')
.controller('homeCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  // $scope.getItems = 
  
  dataService.getItems(function(response) {
    $scope.items = response.data;
    dataService.items = response.data;
  });
    
}])
.controller('craftCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('inventoryCtrl', 
  ['$scope', 'dataService', 'itemTypes', 'itemRarity', 'itemBonuses', 
  function($scope, dataService, itemTypes, itemRarity, itemBonuses) {
    $scope.items = dataService.items;
    $scope.itemTypes = itemTypes;
    $scope.itemRarity = itemRarity;
    $scope.itemBonuses = itemBonuses;
  }])
.controller('equipCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('aboutCtrl', ['$scope', 'dataService', function($scope, dataService) {}]);