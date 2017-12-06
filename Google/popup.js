$(function()
{
  // Display the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button respectively
  chrome.storage.sync.get(['number', 'numberFlash', 'websites', 'front', 'back', 'last_block', 'Unlocked', 'nbr', 'time'], function(blocks)
  {
    // Checks preivously blocked websites and conversely initatilizes storage for blocked websites
    if(isNaN(blocks.numberFlash) || isNaN(blocks.number) || isNaN(blocks.nbr) || isNaN(blocks.time))
    {
      chrome.storage.sync.clear();
      chrome.storage.sync.set({'number': 0, 'numberFlash': 0, 'websites':JSON.stringify([]), 'front': JSON.stringify([]), 'back': JSON.stringify([]), 'last_block': "", 'Unlocked': 0, 'time' : 0.25, 'nbr': 10});
      $('#numberFlash').text(0);
      $('#number').text(0);
    }
    else
    {
      $('#numberFlash').text(blocks.numberFlash);
      $('#number').text(blocks.number);
      console.log("Number of websites: ", blocks.number, "Websites blocked: ", blocks.websites, "Number of flashcards: ", blocks.numberFlash, " Front: ", blocks.front, "Back: ", block.back, "Last block: ", block.last_block, "Last time Unlock: ", blocks.Unlocked, "Procrasitation time: ", blocks.time, "Flashcards to unlock: ", blocks.nbr);
    }
  });

  // Load the existant flashcards in the dropdownmenu
  chrome.storage.sync.get(['numberFlash', 'front'], function(blocks)
  {
    // Creates an array of the front of the existant flashcards
    var x = document.getElementById("flashcards_options");
    let front = JSON.parse(blocks.front);

    // Make all the cards into Option Elements in HTML
    for(let i = 0; i < blocks.numberFlash; i++)
    {
      var option = document.createElement("option");
      option.id = i;
      option.text = front[i];
      x.add(option);
    }

    console.log("Your flashcards were successfully loaded.");
  });

  // Clear all blocked websites
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
        if(url && websites.indexOf(url) == -1) // Make text has been entered and url is not already blocked
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
          if(websites.indexOf(current) == -1) // Make sure the website is not already blocked
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
    chrome.storage.sync.get(['numberFlash', 'front', 'back'], function(oldFlashcards)
    {
      let front = JSON.parse(oldFlashcards.front);
      let back = JSON.parse(oldFlashcards.back);
      let cfront = $('#frontAdd').val();
      let cback = $('#backAdd').val();
      let flashNumber = parseInt(oldFlashcards.numberFlash);
      if(cfront && cback)
      {
        // Add the new flashcard as an Option Element in HTML if the front hasn't been created before
        if(front.indexOf(cfront) == -1)
        {
          var x = document.getElementById("flashcards_options");
          var option = document.createElement("option");
          option.id = flashNumber;
          option.text = cfront;
          flashNumber++;
          x.add(option);
          $('#numberFlash').text(flashNumber);
          front.push(cfront);
          back.push(cback);
        }
        else
        {
          back[front.indexOf(cfront)] = cback;
        }
        chrome.storage.sync.set({'numberFlash':flashNumber, 'front' : JSON.stringify(front), 'back' : JSON.stringify(back)});
        $('#frontAdd').val('');
        $('#backAdd').val('');

        console.log("Flashcard added,: ", cfront, " : ", cback);
        console.log("Number of flashcards: ", flashNumber, "Front: ", front, "Back: ", back);
      };
    });
  });

  // Delete one flashcard
  $('#DelFlash').click(function()
  {
    let card = $('#flashcards_options').val();
    if(card != "Select the flashcard you want to delete")
    {
      chrome.storage.sync.get(['front', 'back', 'numberFlash'], function(blocks)
      {
        let front = JSON.parse(blocks.front);
        let back = JSON.parse(blocks.back);
        let id = front.indexOf(card);
        $("#flashcards_options option[id=" + id + "]").remove();
        let numberFlash = blocks.numberFlash;
        front.splice(id, 1);
        back.splice(id, 1);
        numberFlash--;
        $('#numberFlash').text(numberFlash);
        chrome.storage.sync.set({'flashcards' : JSON.stringify(flashcard), 'numberFlash' : numberFlash});
        console.log("Flahscard deleted: ", card);
        console.log("Number of flashcards: ", flashNumber, "Front: ", front, "Back: ", back);
      });
    };
  });

  // Delete all flashcards
  $('#DelAll').click(function()
  {
    chrome.storage.sync.get(['front', 'numberFlash'], function(blocks)
    {
      let front= JSON.parse(blocks.front);
      let numberFlash = blocks.numberFlash;
      for(let i = 0; i < front.length; i++)
      {
        $("#flashcards_options option[id=" + i + "]").remove();
      }
      chrome.storage.sync.set({'numberFlash' : 0, 'front':JSON.stringify([]), 'back' :JSON.stringify([])});
      console.log("All flashcards have been deleted.");
    });
  });

  // Reinitialize
  $('#Rein').click(function()
  {
      chrome.storage.sync.clear();
      chrome.storage.sync.set({'number': 0, 'numberFlash': 0, 'websites':JSON.stringify([]), 'front': JSON.stringify([]), 'back': JSON.stringify([]), 'last_block': "", 'Unlocked': 0, 'time' : 0.25, 'nbr': 10});
      $('#numberFlash').text(0);
      $('#number').text(0);
      console.log("Procrastanki was successfully reinitialized.");
  });

  // Set block time or # flashcards
  $('#set').click(function()
  {
    let nbr = $('#nbr').val();
    let time = $('#time').val();
    if(Number.isInteger(parseInt(nbr)) && nbr == parseInt(nbr) && parseInt(nbr) > 0)
    {
      chrome.storage.sync.set({'nbr': parseInt(nbr)});
      $('#nbr').val('');
      console.log("Number of flashcards to do: ", nbr);
    }

    if(Number.isFinite(parseFloat(time)) && parseFloat(time) > 0)
    {
      chrome.storage.sync.set({'time': parseFloat(time)});
      $('#time').val('');
      console.log("Procrastination time: ", time);
    }
  });
});
