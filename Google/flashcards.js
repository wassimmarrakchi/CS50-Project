//Generate unordered array of flashcards
chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
{
	// Flashcard functionality
	let pile = [];
	let questions = 10;
	let total_correct = 0;
	let location = 0;
	let unordered_cards = JSON.parse(current_flashcards.flashcards);

	// Ensure flashcards
	if (Object.keys(unordered_cards).length == 0)
	{
		chrome.tabs.update({url:chrome.extension.getURL('error.html')});
	}

	// Create array of keys from dictionary
	let temp;
	for(temp in unordered_cards)
	{
     pile.push(temp);
	}

	console.log("unordered_cards: ", unordered_cards);
	console.log("pile: ", pile);
	console.log("pile length: ", pile.length);
	console.log("questions before: ", questions);

	// Define total correct answers to pass (default 10 unless fewer exist)
	if (pile.length < 10)
	{
		questions = pile.length;
		console.log("questions after: ", questions);
	}

	// Render total number of questions
	$("#questions").text(questions);

	ask(pile)

	$('#check').click(function()
	{
		check(total_correct, questions, pile, location, unordered_cards)
	});
});

function ask(pile, location)
{
	location = Math.floor(Math.random() * pile.length);
	$("#question").text(pile[location]);
}

function check(total_correct, questions, pile, location, unordered_cards)
{
	console.log("answer: ", unordered_cards[pile[location]]);
	// Check correct
	if ($('#answer').val() == unordered_cards[pile[location]])
	{
		pile.splice(location, 1);
		total_correct++;
		$("#answer").val('');
		$("#total_correct").text(total_correct);
		console.log("correct!")
	}
	else
	{
		$("#answer").text(unordered_cards[pile[location]]);
	}

	if (total_correct == questions)
	{
		chrome.tabs.update({url:chrome.extension.getURL('popup.html')});
	}
	else
	{
		ask(pile)
	}
}
