'use strict';

angular.module('moeCalcApp')
.value('itemTypes', ["helmet", "weapon", "torso", "gloves", "boots", "ring"])
.value('itemRarity', ["common", "uncommon", "rare", "epic", "legendary"])
.value('itemBonuses', ["Army Load", "Training Speed", "Faction Unit Training Speed", "Healing Speed", "Gathering Speed", "March Speed", "Squad Size", "Rally Size", "Army Attack", "Army Health", "Swordsmen Attack", "Swordsmen Health", "Spearmen Attack", "Spearmen Health", "Cavalry Attack", "Cavalry Health", "Ranged Attack", "Ranged Health", "Seige Machine Attack", "Seige Machine Health", "Defense's Effectiveness", "Defense's Durability", "Faction Unit Attack", "Faction Unit Health", "Food Income", "Wood Income", "Stone Income", "Iron Income", "Silver Income", "Construction Speed", "Trap Construction Speed", "Resource Sending Limit", "Champion XP", "Upkeep", "Research Speed", "Wood Capacity", "Stone Capacity", "Iron Capacity", "Silver Capacity"])
.service('dataService', ['$http', function($http) {
  this.getItems = function(callback) {
    $http.get('data/items.json').then(callback);
  };
}])
.service('gitApiService', ['$http', function($http) { 
  this.getCommits = function(callback) {
    $http.get('https://api.github.com/repos/learley/moeCalc/commits').then(callback);
  };
}]);