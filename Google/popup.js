$(function()
{
  // Display the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button respectively
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
  chrome.storage.sync.get(['numberFlash', 'flashcards'], function(blocks){
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
  $('#sites').click(function(){
    chrome.storage.sync.get('flashcards', function(blocks)
    {
      let pile = [];
      let unordered_cards = JSON.parse(blocks.flashcards);
    	let temp;
    	for(temp in unordered_cards)
      {
         pile.push(temp);
    	}
      for(let i = 0; i < pile.length; i++)
      {
        $("#flashcards_options option[id=" + pile[i] + "]").remove();
      }
    });
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
          var x = document.getElementById("flashcards_options");
          var option = document.createElement("option");
          option.id = front;
          option.text = front;
          x.add(option);
        }
        flashcards[front]=back;
        chrome.storage.sync.set({'numberFlash':flashNumber, 'flashcards' : JSON.stringify(flashcards)});
        $('#frontAdd').val('');
        $('#backAdd').val('');
        $('#numberFlash').text(flashNumber);

        console.log("Flashcard added,: ", front, " : ", back);
        console.log("Existant flashcards: ", flashcards);
      };
    });
  });

  // Delete one flashcard
  $('#DelFlash').click(function(){
    let card = $('#flashcards_options').val();
    if(card != "Select the flashcard you want to delete")
    {
      $("#flashcards_options option[id=" + card + "]").remove();
      chrome.storage.sync.get(['flashcards', 'numberFlash'], function(blocks){
        let flashcard = JSON.parse(blocks.flashcards);
        let numberFlash = blocks.numberFlash;
        delete flashcard[card];
        numberFlash--;
        $('#numberFlash').text(numberFlash);
        // if(!flashcard)
        // {
        //   flashcard ={};
        // }
        chrome.storage.sync.set({'flashcards' : JSON.stringify(flashcard), 'numberFlash' : numberFlash});
        console.log("Flahscard deleted: ", card);
        console.log("Existant flashcards: ", flashcard);
      });
    };
  });
});
