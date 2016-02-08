/* Page Loader */

var $pageLoader = $('#page-loader');

$(".main-nav li").on('click', function(event) {
  var targetContent = $(this).children('a').attr('href') + ' #content-area';
  
  // block normal target page load
  event.preventDefault();
  
  // remove 'selected' class from all .main-nav anchor elements 
  $.each($(this).siblings(), function(i, anchor) {
    $(anchor).children('a').removeClass('selected');
  })
  // add 'selected' class to target anchor element
  $(this).children('a').addClass('selected');
  
  // load #content-area div from target html document into #page-loader div
  $pageLoader.load(targetContent);
  
});