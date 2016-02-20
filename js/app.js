var itemDataURL = "./data/items.json"
var items = [];
var itemTypes = ["helmet", "weapon", "torso", "gloves", "boots", "ring"];
var itemRarity = ["common", "uncommon", "rare", "epic", "legendary"];
var itemBonuses = ["Army Load", "Training Speed", "Faction Unit Training Speed", "Healing Speed", "Gathering Speed", "March Speed", "Squad Size", "Rally Size", "Army Attack", "Army Health", "Swordsmen Attack", "Swordsmen Health", "Spearmen Attack", "Spearmen Health", "Cavalry Attack", "Cavalry Health", "Ranged Attack", "Ranged Health", "Seige Machine Attack", "Seige Machine Health", "Defense's Effectiveness", "Defense's Durability", "Faction Unit Attack", "Faction Unit Health", "Food Income", "Wood Income", "Stone Income", "Iron Income", "Silver Income", "Construction Speed", "Trap Construction Speed", "Resource Sending Limit", "Champion XP", "Upkeep", "Research Speed", "Wood Capacity", "Stone Capacity", "Iron Capacity", "Silver Capacity"];

var displayItemIndices = false;
var tableDepth = 0;

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
      generateCraftFilterSelects();
      updateCraftItemSelect();
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
  var outHTML = '<tr class="item-tr ' + itemRarity[item.rarity] + '">';
  
  if (displayItemIndices) {
    outHTML += '<td>' + index + '</td>';
  }
  outHTML += '<td class="item-type"><img class="item-icon" src="./img/' + itemTypes[item.type] + '.png" alt=' + itemTypes[item.type] + '</td>';
  outHTML += '<td class="item-name">' + item.name + '</td>';
  outHTML += '<td class="item-level">' + item.level + '</td>';

  outHTML += '<td class="item-bonus"><ul>';
  $.each(item.bonus, function(i, bonusItem) {
    outHTML += '<li>' + itemBonuses[bonusItem.stat] + ': ' + bonusItem.value + '%</li>';
  });
  outHTML += '</ul></td>'
  
  outHTML += '<td class="item-sell"><img class="item-silver" src="./img/silver.png" alt="silver">' + item.sell + '</td>';
  outHTML += '</tr>';
  
  return outHTML;  
}

var indexArrayToTable = function(indexArray) {
  var outHTML = '';

  outHTML += '<table>';
  outHTML += '<thead><tr>';
  outHTML += '<th scope="col">Type</th>';
  outHTML += '<th scope="col">Name</th>';
  outHTML += '<th scope="col" class="item-level">Level</th>';
  outHTML += '<th scope="col">Bonuses</th>';
  outHTML += '<th scope="col">Sell</th>';
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

  outHTML += '<table class="table-depth-0" style="float:left;">';
  outHTML += '<thead><tr>';
  outHTML += '<th scope="col">Index</th>';
  outHTML += '<th scope="col">Type</th>';  
  outHTML += '<th scope="col">Name</th>';
  outHTML += '<th scope="col">Level</th>';
  outHTML += '<th scope="col">Bonuses</th>';
  outHTML += '<th scope="col">Sell</th>';
  outHTML += '</tr></thead>';
  
  outHTML += '<tbody>';
  $.each(items, function(i, item) {
    outHTML += itemTR(i);
  });
  outHTML += '</tbody></table>';
  
  outHTML += '<table class="table-depth-0" style="float:left;">';
  outHTML += '<thead><tr>';
  outHTML += '<th scope="col">Index</th>';
  outHTML += '<th scope="col">Stat</th>';
  outHTML += '</tr></thead>';
  outHTML += '<tbody>';
  $.each(itemBonuses, function(i, bonus) {
    outHTML += '<tr><td>' + i + '</td><td>' + bonus + '</td></tr>';
  });
  outHTML += '</tbody></table>';
  
  $('#content-area').append(outHTML);
}

var testDisplay = function(testItemIndex) {
  var outHTML = '';
  // var displayArray = [];
  // var testItem = items[testItemIndex];
  
  // //displayArray.push(testItemIndex);
  // $.each(Object.keys(testItem.recipe), function(i,inputItem) {
  //   displayArray.push(parseInt(inputItem));
  // });
  // outHTML = indexArrayToTable(displayArray);
  outHTML += craftTableTree(testItemIndex);
      
  $('#craft-tree').html(outHTML);
  bindTableEvents();
}

var craftTableTree = function(baseItemIndex) {
  var outHTML = '';
  var baseItem = items[baseItemIndex];
  
  if (tableDepth === 0) {
    outHTML += '<table class="table-depth-' + tableDepth + '">';
  }
  tableDepth += 1;
  
  outHTML += itemTR(baseItemIndex); 
  outHTML += '<tr class="hidden table-container-tr"><td colspan=5 class="table-container-td">';
  outHTML += '<table class="table-depth-' + tableDepth + '">';
  if (!$.isEmptyObject(baseItem.recipe)) {
    $.each(Object.keys(baseItem.recipe), function(i,recipeItemIndex) {
      outHTML += craftTableTree(recipeItemIndex);
    });
  }
  else {
    outHTML += 'This item cannot be crafted.';
  }
  outHTML += '</table></td></tr>';
  tableDepth -= 1;
  
  if (tableDepth === 0) {
    outHTML += '</table>';
  }
  
  return outHTML;
}

var bindTableEvents = function() {
  $(".table-depth-0").children().children(".hidden").removeClass("hidden");
  $(".item-tr").on('click', function() {
    $(this).next().toggleClass("hidden");
  });
}

var generateCraftFilterSelects = function() {
  var $type = $('#type');
  var $rarity = $('#rarity');
  var optionsHTML = '';
  
  $.each(itemTypes, function(i, type) {
    optionsHTML += '<option value=' + i + '>' + capStr(type) + '</option>';
  });
  $type.html(optionsHTML);
  
  optionsHTML = '';
  $.each(itemRarity, function(i, rarity) {
    optionsHTML += '<option value=' + i + '>' + capStr(rarity) + '</option>';
  });
  $rarity.html(optionsHTML);
  
  $type.change(updateCraftItemSelect);
  $rarity.change(updateCraftItemSelect);
  $('#load-item').click(function() {
    var itemValue = parseInt(($('#item').val()));
    testDisplay(itemValue);
  });
}

var updateCraftItemSelect = function() {
  var typeValue = parseInt($('#type').val());
  var rarityValue = parseInt($('#rarity').val());
  var $item = $('#item');
  var optionsHTML = '';
  
  $.each(items, function(i, currentItem) {
    if (currentItem.type === typeValue && currentItem.rarity === rarityValue){
      optionsHTML += '<option value=' + i + '>' + currentItem.name + '</option>';  
    }    
  });
  $item.html(optionsHTML);
}

// Capitalizes first letter of inputString
var capStr = function(inputString) {
  return inputString.substr(0,1).toUpperCase() + inputString.substr(1);
}

