$(function()
{
	//Generate intial flashcard
	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
	{
>>>>>>> 978c318388d89c19dd09a7335540816c75e0efde
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	let pile = [];
    	let temp;
    	for(temp in unordered_cards)
			{
	        pile.push(temp);
	        console.log("temp: ", temp);
    	}
<<<<<<< HEAD
    });

	// Flashcard check
	$('#check').click(function(){
	  console.log("ping click")
      question
=======
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

  function ask() {
        initial = pile[Math.floor(Math.random() * pile.length)];
        console.log("pile: ", pile);
        console.log("initial: ", initial);
        pile.splice(initial, 1);
        let question = initial;
        $("#question").text(question);
    }
});
