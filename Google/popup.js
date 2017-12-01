$(function()
{
  // Display the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button
  chrome.storage.sync.get(['number', 'numberFlash', 'websites', 'flashcards'], function(blocks){
    if(blocks.number || blocks.numberFlash)
    {
      $('#number').text(parseInt(blocks.number));
      $('#numberFlash').text(parseInt(blocks.numberFlash))
    }
    else
    {
      chrome.storage.sync.set({'number': 0, 'websites': JSON.stringify([]), 'flashcards': JSON.stringify({}), 'numberFlash':0});
      $('#number').text("0");
      $('#numberFlash').text("0")
    }

    console.log("Number of websites: ", blocks.number, "Websites blocked: ", blocks.websites, "Number of flashcards: ", blocks.numberFlash, " Flashcards: ", blocks.flashcards);
  })

  // Load the existant flashcards in the dropdownmenu
  $('#flashcards_options').click(function()
  {
    chrome.storage.sync.get(['numberFlash', 'flashcards'], function(blocks)
    {
      var x = document.getElementById("flashcards_options");
      for(let i = 0; i < blocks.numberFlash; i++)
      {
        var option = document.createElement("option");
        option.text = "Kiwi";
      }
    });
  });

  // Clear all blocked websites and all flashcards created
  $('#sites').click(function(){
    chrome.storage.sync.clear();
    $('#number').text("0");
    $('#numberFlash').text("0");
    chrome.storage.sync.set({'number': 0, 'websites': JSON.stringify([]), 'flashcards':JSON.stringify({}), 'numberFlash':0});
    console.log("All websites and flashcards have been cleared");
  });

  // Add url to blocked websites
  $('#Block').click(function(){
      chrome.storage.sync.get(['number', 'websites'], function(oldNumber){
        let number = parseInt(oldNumber.number);
        let websites = JSON.parse(oldNumber.websites);
        let url = $('#url').val();
        if(url){
          number += 1;
          websites.push(url);
          chrome.storage.sync.set({'websites' : JSON.stringify(websites)})
          chrome.storage.sync.set({'number': number});
          $('#number').text(number);
          $('#url').val('');
          console.log("Number of websites: ", number, "Websites blocked: ", websites);
          };
        });
      });

  // Add current site to the blocked websites
  $('#current').click(function(){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
      function(tabs){
        let current = tabs[0].url;
        chrome.storage.sync.get(['number', 'websites'], function(oldNumber){
          let number = parseInt(oldNumber.number);
          let websites = JSON.parse(oldNumber.websites);
          number++;
          websites.push(current);
          chrome.storage.sync.set({'websites' : JSON.stringify(websites)})
          chrome.storage.sync.set({'number': number});
          $('#number').text(number);
          console.log("Number of websites: ", number, "Websites blocked: ", websites);
      });
    });
  })

  // Add new flashcard
  $('#AddFlash').click(function(){
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
        }
        flashcards[front]=back;
        chrome.storage.sync.set({'numberFlash':flashNumber, 'flashcards' : JSON.stringify(flashcards)});
        $('#frontAdd').val('');
        $('#backAdd').val('');
        $('#numberFlash').text(flashNumber);
        console.log("Flashcard added, ", front, " : ", back);
        console.log("Existant flashcards: ", flashcards);
      };
    });
  });
});
