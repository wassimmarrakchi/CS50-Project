let pile = [];
let correct_answer;
let correct;
let question;
let unordered_cards = {};
let total_correct = 0;
let splice;
let old_url;
chrome.storage.sync.get('visited', function(block){
	old_url = block.visited;
});

chrome.storage.sync.set({old_url : 'false'});

// Generate and display new question
function ask(pile) {
		let location = Math.floor(Math.random() * pile.length);
		splice = location;
		question = pile[location];
		$("#question").text(question);
		correct_answer = unordered_cards[question];
		console.log("question: ", question);
		console.log("correct answer: ", correct_answer);
}

// Flashcard functionality
$(function(){
	if (pile.length == 0) {
		//Generate unordered array of flashcards
			chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards) {
	    	unordered_cards = JSON.parse(current_flashcards.flashcards);
	    	let temp;

				// Create array of keys from dictionarry
	    	for(temp in unordered_cards) {
		       pile.push(temp);
	    	}

				// Define total correct answers to pass
				if (pile.length < 20) {
					correct = pile.length;
				}
				else {
					correct = 10
				}
				$("#correct").text(correct);

				ask(pile);
				console.log("cards: ", unordered_cards);
			});
		}

	// Flashcard check
	$('#check').click(function(){
		user_answer = $('#Answer').val();
		console.log("You answered: ", user_answer);

		// Check correct
		if (user_answer == correct_answer) {
			console.log("correct");
			pile.splice(splice, 1);
			total_correct++;
		}

		// Check if pass
		if (total_correct == correct) {
			console.log("You win!");
			chrome.storage.sync.set({'pass'} : true);
			chrome.tabs.update({url:old_url});
		}

		// Clear input
		$("#Answer").val('');

		// Update counter
		$("#total_correct").text(total_correct);

		ask(pile);
  });
});
