$(function()
{
	//Generate intial flashcard
	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
	{
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	let pile = [];
    	let temp;
    	for(temp in unordered_cards)
			{
	        pile.push(temp);
	        console.log("temp: ", temp);
    	}
    	initial = pile[Math.floor(Math.random() * pile.length)];
    	pile.splice(initial, 1);
    	let question = initial;
      $("#question").text(question);
  });

	// Flashcard functionality
	$('#check').click(function()
	{
			console.log("ping click")
	});
});
