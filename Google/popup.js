$(function()
{
  // Display the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button respectively
  chrome.storage.sync.get(['number', 'numberFlash', 'websites', 'flashcards', 'last_block', 'Unlocked'], function(blocks)
  {
      if(blocks.number)
      {
        $('#number').text(parseInt(blocks.number));
        console.log("Number of websites: ", blocks.number, "Websites blocked: ", blocks.websites);
      }
      else
      {
        chrome.storage.sync.set({'number': 0, 'websites':JSON.stringify([])});
        console.log("Number of websites: ", 0, "Websites blocked: ", '{}');
      }

      if(blocks.numberFlash)
      {
        $('#numberFlash').text(parseInt(blocks.numberFlash));
        console.log("Number of flashcards: ", blocks.numberFlash, " Flashcards: ", blocks.flashcards);
      }
      else
      {
        chrome.storage.sync.set({'numberFlash': 0, 'flashcards':JSON.stringify({})});
        console.log("Number of flashcards: ", 0, " Flashcards: ", '{}');
      }

      console.log('Last block: ', blocks.last_block, 'Unlocked: ', blocks.Unlocked);
  });

  // Load the existant flashcards in the dropdownmenu
  chrome.storage.sync.get(['numberFlash', 'flashcards'], function(blocks)
  {
    let pile = [];
    var x = document.getElementById("flashcards_options");
    let unordered_cards = JSON.parse(blocks.flashcards);
  	let temp;
  	for(temp in unordered_cards)
    {
       pile.push(temp);
  	}
    for(let i = 0; i < blocks.numberFlash; i++)
    {
      var option = document.createElement("option");
      option.id = pile[i];
      option.text = pile[i];
      x.add(option);
    }
  });

  // Clear all blocked websites and all flashcards created
  $('#sites').click(function()
  {
    $('#number').text("0");
    chrome.storage.sync.set({'number': 0, 'websites': JSON.stringify([]), 'last_block': "", 'Unlocked' : 0});
    console.log("All websites and block information have been cleared.");
  });

  // Add url to blocked websites
  $('#Block').click(function()
  {
      chrome.storage.sync.get(['number', 'websites'], function(oldNumber)
      {
        let number = oldNumber.number;
        let websites = JSON.parse(oldNumber.websites);
        let url = $('#url').val();
        // Make text has been entered and url is not already blocked
        if(url && websites.indexOf(url) == -1)
        {
          number += 1;
          websites.push(url);
          chrome.storage.sync.set({'number': number, 'websites' : JSON.stringify(websites)});
          $('#number').text(number);
          console.log("Number of websites: ", number, "Websites blocked: ", websites);
        };
        $('#url').val('');
      });
  });

  // Add current site to the blocked websites
  $('#current').click(function()
  {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs)
      {
        let current = tabs[0].url;
        if(current != "chrome-extension://hafbfihabfkkfajojhmgklmcgdokjklj/flashcard.html" )
        {
          chrome.storage.sync.get(['number', 'websites'], function(oldNumber)
          {
            let number = parseInt(oldNumber.number);
            let websites = JSON.parse(oldNumber.websites);
            // Make sure the website is not already blocked
            if(websites.indexOf(current) == -1)
            {
              number++;
              websites.push(current);
              chrome.storage.sync.set({'number': number, 'websites' : JSON.stringify(websites)})
              $('#number').text(number);
            }
            console.log("Number of websites: ", number, "Websites blocked: ", websites);
          });
        }
      });
  });

  // Add new flashcard
  $('#AddFlash').click(function()
  {
    chrome.storage.sync.get(['numberFlash', 'flashcards'], function(oldFlashcards){
      let flashcards = JSON.parse(oldFlashcards.flashcards);
      let front = $('#frontAdd').val();
      let back = $('#backAdd').val();
      let flashNumber = parseInt(oldFlashcards.numberFlash);
      if(front && back)
      {
        if(!flashcards[front])
        {
          flashNumber++;
          var x = document.getElementById("flashcards_options");
          var option = document.createElement("option");
          option.id = front;
          option.text = front;
          x.add(option);
          $('#numberFlash').text(flashNumber);
        }
        flashcards[front]=back;
        chrome.storage.sync.set({'numberFlash':flashNumber, 'flashcards' : JSON.stringify(flashcards)});
        $('#frontAdd').val('');
        $('#backAdd').val('');

        console.log("Flashcard added,: ", front, " : ", back);
        console.log("Existant flashcards: ", flashcards);
      };
    });
  });

  // Delete one flashcard
  $('#DelFlash').click(function()
  {
    let card = $('#flashcards_options').val();
    if(card != "Select the flashcard you want to delete")
    {
      $("#flashcards_options option[id=" + card + "]").remove();
      chrome.storage.sync.get(['flashcards', 'numberFlash'], function(blocks)
      {
        let flashcard = JSON.parse(blocks.flashcards);
        let numberFlash = blocks.numberFlash;
        delete flashcard[card];
        numberFlash--;
        $('#numberFlash').text(numberFlash);
        chrome.storage.sync.set({'flashcards' : JSON.stringify(flashcard), 'numberFlash' : numberFlash});
        console.log("Flahscard deleted: ", card);
        console.log("Existant flashcards: ", flashcard);
      });
    };
  });
});
