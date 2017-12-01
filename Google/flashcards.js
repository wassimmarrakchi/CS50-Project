$(function(){
	//Generate intial flashcard
	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards){
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	console.log("pairs: ", unordered_cards);
    	let pile = [];
    	let temp;
    	for(temp in unordered_cards) {
	        pile.push(temp);
	        console.log("temp: ", temp);
    	}
    	initial = pile[Math.floor(Math.random() * pile.length)];
<<<<<<< HEAD
    	console.log("pile: ", pile);
=======
>>>>>>> 8667ebcb6a547ba06865a0605d0e9f79b278a5ce
    	console.log("initial: ", initial);
    	pile.splice(initial, 1);
    	let question = pile[initial];

    });

	// Flashcard functionality
	$('#check').click(function(){
	  console.log("ping click")
	});
});
