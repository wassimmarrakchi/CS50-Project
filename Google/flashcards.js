//Generate unordered array of flashcards
chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
{
	// Flashcard functionality
	let pile = [];
	let questions = 10;
	let total_correct = 0;
	let unordered_cards = {};
	unordered_cards = JSON.parse(current_flashcards.flashcards);

	// Create array of keys from dictionary
	let temp;
	for(temp in unordered_cards)
	{
     pile.push(temp);
	}

	console.log("unordered_cards: ", unordered_cards);

	if (pile.length = 0)
	{
		chrome.tabs.update({url:chrome.extension.getURL('error.html')});
	}

	// Define total correct answers to pass (default 10 unless fewer exist)
	if (pile.length < 10)
	{
		questions = pile.length;
		$("#questions").text(questions);
	}

	// Render total number of questions
	$("#questions").text(questions);

	// Generate and display new question
	while (total_correct < questions)
	{
		let location = Math.floor(Math.random() * pile.length);
		$("#question").text(pile[location]);

		// Check user submission
		$('#check').click(function()
		{
			// Check correct
			if ($('#answer').val() == unordered_cards[pile[location]])
			{
				pile.splice(location, 1);
				total_correct++;
			}

			// Clear input
			$("#Answer").val('');

			// Update counter
			$("#total_correct").text(total_correct);
		});
	};
});
