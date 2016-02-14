var itemDataURL = "./data/items.json"
var items = [];
var itemTypes = ["helmet", "weapon", "torso", "gloves", "boots", "ring"];
var itemRarity = ["common", "uncommon", "rare", "epic", "legendary"];
var itemBonuses = ["Army Load", "Training Speed", "Faction Unit Training Speed", "Healing Speed", "Gathering Speed", "March Speed", "Squad Size", "Rally Size", "Army Attack", "Army Health", "Swordsmen Attack", "Swordsmen Health", "Spearmen Attack", "Spearmen Health", "Cavalry Attack", "Cavalry Health", "Ranged Attack", "Ranged Health", "Seige Machine Attack", "Seige Machine Health", "Defense's Effectiveness", "Defense's Durability", "Faction Unit Attack", "Faction Unit Health", "Food Income", "Wood Income", "Stone Income", "Iron Income", "Silver Income", "Construction Speed", "Trap Construction Speed", "Resource Sending Limit", "Champion XP", "Upkeep", "Research Speed", "Wood Capacity", "Stone Capacity", "Iron Capacity", "Silver Capacity"];

var displayItemIndices = false;

/* Page Loader */

var $pageLoader = $('#page-loader');

$(".main-nav li").on('click', function(event) {
  var targetHref = $(this).children('a').attr('href');
  var targetContent = targetHref + ' #content-area';
  
  // block normal target page load
  event.preventDefault();
  
  // remove 'selected' class from all .main-nav anchor elements 
  $.each($(this).siblings(), function(i, listElement) {
    $(listElement).children('a').removeClass('selected');
  })
  // add 'selected' class to target anchor element
  $(this).children('a').addClass('selected');
  
  // load #content-area div from target html document into #page-loader div
  $pageLoader.load(targetContent, function() {
    pageInit(targetHref);      
  });
  
});


// Load item data from JSON into items array
$.getJSON(itemDataURL, function(data) {
  items = data;
});

var pageInit = function(href) {
  switch(href) {
    case "craft.html" :
      displayItemIndices = false;
      testDisplay();
      break;
    case "inventory.html" :
      displayItemIndices = true;
      testFullDisplay();
      break;
  }
}

// Builds table row for display
var itemTR = function(index) {
  var item = items[index];
  var outHTML = '<tr>'
  
  if (displayItemIndices) {
    outHTML += '<td>' + index + '</td>';
  }
  outHTML += '<td>' + item.name + '</td>';
  outHTML += '<td>' + item.level + '</td>';
  outHTML += '<td>' + itemTypes[item.type] + '</td>';
  outHTML += '<td>' + itemRarity[item.rarity] + '</td>';
  outHTML += '<td>' + item.sell + '</td>';
  
  outHTML += '<td><ul>';
  $.each(item.bonus, function(i, bonusItem) {
    outHTML += '<li>' + itemBonuses[bonusItem.stat] + ': ' + bonusItem.value + '%</li>';
  });
  outHTML += '</ul></td>'
  
  outHTML += '</tr>';
  
  return outHTML;  
}

var indexArrayToTable = function(indexArray) {
  var outHTML = '';

  outHTML += '<table>';
  outHTML += '<thead><tr>';
  outHTML += '<th scope="col">Name</th>';
  outHTML += '<th scope="col">Level</th>';
  outHTML += '<th scope="col">Type</th>';
  outHTML += '<th scope="col">Rarity</th>';
  outHTML += '<th scope="col">Sell<br>(silver)</th>';
  outHTML += '<th scope="col">Bonuses</th>';
  outHTML += '</tr></thead>';
  
  outHTML += '<tbody>';
  $.each(indexArray, function(i, index) {
    outHTML += itemTR(index);
  });
  outHTML += '</tbody>';
  
  outHTML += '</table>';
  
  return outHTML;
}

// Test display function
var testFullDisplay = function() {

  var outHTML = '';

  outHTML += '<table>';
  outHTML += '<thead><tr>';
  outHTML += '<th scope="col">Index</th>';
  outHTML += '<th scope="col">Name</th>';
  outHTML += '<th scope="col">Level</th>';
  outHTML += '<th scope="col">Type</th>';
  outHTML += '<th scope="col">Rarity</th>';
  outHTML += '<th scope="col">Sell<br>(silver)</th>';
  outHTML += '<th scope="col">Bonuses</th>';
  outHTML += '</tr></thead>';
  
  outHTML += '<tbody>';
  $.each(items, function(i, item) {
    outHTML += itemTR(i);
  });
  outHTML += '</tbody>';
  
  outHTML += '</table>';
  
  $('#content-area').append(outHTML);
}

var testDisplay = function() {
  var outHTML = '';
  var displayArray = [];
  var testItemIndex = 5;
  var testItem = items[testItemIndex];
  
  //displayArray.push(testItemIndex);
  $.each(Object.keys(testItem.recipe), function(i,inputItem) {
    displayArray.push(parseInt(inputItem));
  });
  console.log(displayArray);
  outHTML = indexArrayToTable(displayArray);
      
  $('#content-area').html(outHTML);
}