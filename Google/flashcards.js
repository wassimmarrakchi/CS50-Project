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
    	let unordered_cards = JSON.parse(current_flashcards.flashcards);
    	let temp;
    	for(temp in unordered_cards) {
	       pile.push(temp);
    	}
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
});
