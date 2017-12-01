$(function(){
	//Generate intial flashcard
	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards){
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	let pile = [];
    	let temp;
    	for(temp in unordered_cards) {
	        if(unordered_cards.hasOwnProperty(temp)) {
	           pile.push(temp);
	       	}
    	}
    	initial = pile[Math.floor(Math.random() * pile.length)];
    	console.log("initial: ", initial)
    	pile.splice(initial, 1);
    	let question = pile[initial];

    });

	// Flashcard functionality
	$('#check').click(function(){
	  console.log("ping click")
	});
});
