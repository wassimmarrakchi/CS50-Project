$(function()
{
	// Generate unordered array of flashcards
	let pile = []; // Array of card object keys for random functionality
	let questions = 10; // Default number of sufficient questions
	let total_correct = 0; // How many correct answers user has input
	let location = 0; // Location of random question in array
	let unordered_cards = {} // Card object

	chrome.storage.sync.get(['numberFlash', 'flashcards'], function(current_flashcards)
	{
		unordered_cards = JSON.parse(current_flashcards.flashcards);

		// Make sure there are flashcards
		if (Object.keys(unordered_cards).length == 0)
		{
			chrome.tabs.update({url:chrome.extension.getURL('error.html')});
		};

		// Create array of keys from dictionary
		let temp;
		for(temp in unordered_cards)
		{
	     pile.push(temp);
		};

		// Define total correct answers to pass (default 10 unless fewer exist)
		if (pile.length < questions)
		{
			questions = pile.length;
		};

		$("#questions").text(questions);

		ask();

		// Listen for user submission
		$('#check').click(function()
		{
			check();
		});
	});

	// Displays random question
	function ask()
	{
		// Location used in both ask and check
		location = Math.floor(Math.random() * pile.length);

		// Render random question
		$("#question").text(pile[location]);
	};

	// Checks user input
	function check()
	{
		let elem = document.getElementById("result_box");

		// Check if user input matches correct answer
		if ($('#answer').val() == unordered_cards[pile[location]])
		{
			pile.splice(location, 1);

			// Remeber total correct answers
			total_correct++;

			// Update page
			$("#answer").val('');
			$("#total_correct").text(total_correct);
			$("#result").text("Correct!");
			elem.setAttribute("style","visibility: visible; background-color: lime;");
		}

		// Incorrect answer
		else
		{
			// Update page
			$("#answer").val('');
			$("#result").text("Correct Answer: " + unordered_cards[pile[location]]);
			elem.setAttribute("style","visibility: visible; background-color: red;");
		};

		// Check if sufficient correct answer
		if (total_correct == questions)
		{
			chrome.storage.sync.get(['last_block', 'websites', 'last_website', 'number'], function(newUrl)
			{
				let websites = JSON.parse(newUrl.websites);
				websites.splice(websites.indexOf(newUrl.last_website));
				chrome.storage.sync.set({'websites' : websites, 'number': newUrl.number - 1});
				chrome.tabs.update({url: newUrl.last_block});
			});
		}
		else
		{
			// Ask another question
			ask();
		};
	};
});
