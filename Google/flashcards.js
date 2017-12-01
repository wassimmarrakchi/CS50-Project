$(function(){
	//Generate intial flashcard
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  		console.log("ping at", tab.url)
  	});

	// Flashcard functionality
	$('#check').click(function(){
	  console.log("ping click")

	});
});
