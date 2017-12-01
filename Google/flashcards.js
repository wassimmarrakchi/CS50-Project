<<<<<<< HEAD
let pile = [];
let correct_answer;
let correct;

// Generate and display new question
function ask(pile) {
		let question = pile[Math.floor(Math.random() * pile.length)];
		pile.splice(question, 1);
		$("#question").text(question);
}

// Flashcard functionality
$(function(){
	//Generate unordered array of flashcards
		chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards) {
=======
$(function()
{
	//Generate intial flashcard
	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
	{
>>>>>>> 978c318388d89c19dd09a7335540816c75e0efde
>>>>>>> 4d86cb17104b7146193051574dbd7f03a1c6f60e
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	let temp;
    	for(temp in unordered_cards) {
	       pile.push(temp);
    	}
<<<<<<< HEAD
			if (pile.length < 10) {
				correct = pile.length;
			}
			else {
				correct = 10
			}
			$("#correct").text(correct);

			ask(pile);
			console.log("unordered_cards: ", unordered_cards);
			correct_answer = unordered_cards.question;
			console.log("correct answer: ", correct_answer);
		});

		// Flashcard check
		$('#check').click(function(){
			let total_correct;
			user_answer = $('#answer').val();
			console.log("You answered: ", user_answer);
			if (user_answer == correct_answer) {
				console.log("correct");
				total_correct++;
			}
			if (total_correct == correct) {
				console.log("You win!");
			}
			$("#total_correct").text(total_correct);
			ask(pile);
	  });
=======
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
>>>>>>> 4d86cb17104b7146193051574dbd7f03a1c6f60e
});
