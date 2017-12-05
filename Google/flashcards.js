//Generate unordered array of flashcards
chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
{
	// Flashcard functionality
	let pile = []; // Array of card object keys for random functionality
	let questions = 10; // Default number of sufficient questions
	let total_correct = 0; // How many correct answers user has input
	let location = 0; // Location of random question in array
	let unordered_cards = JSON.parse(current_flashcards.flashcards); // card object

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
	if (pile.length < questions)
	{
		questions = pile.length;
		console.log("questions after: ", questions);
	}

	// Render total number of questions
	$("#questions").text(questions);

	// Render question
	ask(pile)

	$('#check').click(function()
	{
		check(total_correct, questions, pile, location, unordered_cards)
	});
});

// Displays random question
function ask(pile, location)
{
	// Location used in both ask and check
	location = Math.floor(Math.random() * pile.length);

	// Render random question
	$("#question").text(pile[location]);
}

// Checks user input
function check(total_correct, questions, pile, location, unordered_cards)
{
	console.log("answer: ", unordered_cards[pile[location]]);

	// Check if user input matches correct answer
	if ($('#answer').val() == unordered_cards[pile[location]])
	{
		// Remove question from pile
		pile.splice(location, 1);

		// Remeber total correct answers
		total_correct++;

		// Clear input box
		$("#answer").val('');

		// Render new total correct answers
		$("#total_correct").text(total_correct);

		console.log("correct!")
	}

	// If user input does not match, populate text box with correct answer
	else
	{
		$("#answer").text(unordered_cards[pile[location]]);
	}

	// Check if sufficient correct answer
	if (total_correct == questions)
	{
		chrome.tabs.update({url:chrome.extension.getURL('popup.html')});
	}
	else
	{
		// Ask another question
		ask(pile)
	}
}
