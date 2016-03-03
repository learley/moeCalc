'use strict';

angular.module('moeCalcApp')
.controller('navCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.links = [
    {
      path : "#/",
      name : "home"
    },
    {
      path : "#/craft",
      name : "craft"
    },
    {
      path : "#/inventory",
      name : "inventory"
    },
    {
      path : "#/equip",
      name : "equip"
    },
    {
      path : "#/about",
      name : "about"
    }
  ];
  
  $scope.isActiveLink = function(path) {
    return (path.substr(1) === $location.path());  
  }
}])
.controller('homeCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  // $scope.getItems = 
  
  dataService.getItems(function(response) {
    $scope.items = response.data;
    dataService.items = response.data;
  });
    
}])
.controller('craftCtrl',  ['$scope', 'dataService', 'itemTypes', 'itemRarity', 'itemBonuses', 
  function($scope, dataService, itemTypes, itemRarity, itemBonuses) {
    $scope.items = dataService.items;
    $scope.itemTypes = itemTypes;
    $scope.itemRarity = itemRarity;
    $scope.itemBonuses = itemBonuses;
    
    $scope.item_type = 0;
    $scope.item_rarity = 0;
    $scope.item_select = 0;
    
    
  }])
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