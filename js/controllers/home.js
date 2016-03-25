'use strict';

angular.module('moeCalcApp')
.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null) {
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    } 
  }
})
.controller('mainCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  dataService.getItems(function(response) {
    $scope.items = response.data;
    dataService.items = response.data;
  });  
  
}])
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
.controller('homeCtrl', ['$scope', function($scope) {
     
}])
.controller('craftCtrl',  ['$scope', '$localStorage', 'dataService', 'itemTypes', 'itemRarity', 'itemBonuses', 
  function($scope, $localStorage, dataService, itemTypes, itemRarity, itemBonuses) {
    $scope.storage = $localStorage;
    $scope.items = dataService.items;
    $scope.itemTypes = itemTypes;
    $scope.itemRarity = itemRarity;
    $scope.itemBonuses = itemBonuses;

    $scope.treeDepth = 0;
    
    $scope.isEmpty = function(obj) {
      if (!angular.isUndefined(obj)) {
        return Object.keys(obj).length > 0;
      }
      return false;
    }
  }])
.controller('inventoryCtrl', 
  ['$scope', '$localStorage', 'dataService', 'itemTypes', 'itemRarity', 'itemBonuses', 
  function($scope, $localStorage, dataService, itemTypes, itemRarity, itemBonuses) {
    $scope.storage = $localStorage;
    $scope.items = dataService.items;
    $scope.itemTypes = itemTypes;
    $scope.itemRarity = itemRarity;
    $scope.itemBonuses = itemBonuses;
    
    
  }])
.controller('equipCtrl', ['$scope', 'dataService', function($scope, dataService) {}])
.controller('aboutCtrl', 
  ['$scope', 'dataService', 'gitApiService', 
  function($scope, dataService, gitApiService) {
    
    gitApiService.getCommits(function(response) {
      $scope.commits = response.data;
      $scope.range = "5";
    });
    
    $scope.selectedRange = function(array, range) {
      
      if (!angular.isUndefined(array)) {
        var displayArray = [];
        for (var i=0; i<range; i+=1) {
          displayArray.push(array[i]);
        }
        return displayArray;
      }
      else {
        return array;
      }
    }          
  }]);