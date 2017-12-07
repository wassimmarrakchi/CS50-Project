$(function()
{
  // Display the number of websites blocked and number of flashcards near the "Blocked Sites" button and the "Make flashcards" button respectively
  chrome.storage.sync.get(['number', 'numberFlash', 'websites', 'front', 'back', 'last_block', 'Unlocked', 'nbr', 'time'], function(blocks)
  {
    // Checks preivously blocked websites and conversely initatilizes storage for blocked websites
    if(isNaN(blocks.numberFlash) || isNaN(blocks.number) || isNaN(blocks.nbr) || isNaN(blocks.time))
    {
      chrome.storage.sync.clear();
      chrome.storage.sync.set({'number': 0, 'numberFlash': 0, 'websites':JSON.stringify([]), 'front': JSON.stringify([]), 'back': JSON.stringify([]), 'last_block': "", 'Unlocked': 0, 'time' : 0.25, 'nbr': 10, 'correct': 0});
      $('#numberFlash').text(0);
      $('#number').text(0);
    }
    else
    {
      $('#numberFlash').text(blocks.numberFlash);
      $('#number').text(blocks.number);
      console.log("Number of websites: ", blocks.number, "Websites blocked: ", blocks.websites, "Number of flashcards: ", blocks.numberFlash, " Front: ", blocks.front, "Back: ", blocks.back, "Last block: ", blocks.last_block, "Last time Unlock: ", blocks.Unlocked, "Procrasitation time: ", blocks.time, "Flashcards to unlock: ", blocks.nbr);
    }
  });

  // Load existant flashcards in the dropdownmenu
  function LoadFlash()
  {
    chrome.storage.sync.get(['numberFlash', 'front', 'websites', 'number'], function(blocks)
    {
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
  }
  LoadFlash();


  // Load existant websites in the dropdownmenu
  function LoadWeb()
  {
    chrome.storage.sync.get(['numberFlash', 'front', 'websites', 'number'], function(blocks)
    {
      var x = document.getElementById("websites_options");
      let websites = JSON.parse(blocks.websites);

      // Make all the websites into Option Elements in HTML
      for(let j = 0; j < blocks.number; j++)
      {
        var option = document.createElement("option");
        option.id = j;
        option.text = websites[j];
        x.add(option);
      }
      console.log("Your websites were successfully loaded.");

    });
  }
  LoadWeb();

  // Empty one of the two dropdownmenus
  function EmptyDropdown(string, number)
  {
    for(let i = 0; i < number; i++)
    {
      $("#" + string + "_options option[id=" + i + "]").remove();
    }
  };

  // Add typed url to blocked websites
  function AddWebsite()
  {
    chrome.storage.sync.get(['number', 'websites'], function(oldNumber)
    {
      let number = oldNumber.number;
      let websites = JSON.parse(oldNumber.websites);
      let url = $('#url').val();
      if(url && websites.indexOf(url) == -1) // Make sure text has been entered and url is not already blocked
      {
        websites.push(url);
        $('#number').text(number);
        var x = document.getElementById("websites_options");
        var option = document.createElement("option");
        option.id = number;
        number += 1;
        option.text = url;
        x.add(option);
        chrome.storage.sync.set({'number': number, 'websites' : JSON.stringify(websites)});
        console.log("Number of websites: ", number, "Websites blocked: ", websites);
      };
      $('#number').text(number);
      $('#url').val('');
    });
  }

  // Click button to add blocked website
  $('#Block').click(function()
  {
      AddWebsite();
  });
  // Click enter to add blocked website
  $("#url").keyup(function(event)
  {
    if(event.keyCode == 13)
    {
      AddWebsite();
    }
  });
  // Add current site to the blocked websites by clicking on button
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
            websites.push(current);
            var x = document.getElementById("websites_options");
            var option = document.createElement("option");
            option.id = number;
            number++;
            $('#number').text(number);
            option.text = current;
            x.add(option);
            chrome.storage.sync.set({'number': number, 'websites' : JSON.stringify(websites)})
          }
          console.log("Number of websites: ", number, "Websites blocked: ", websites);
        });
      }
    });
  });


  // Unblock one website
  function DelWeb()
  {
    let url = $('#websites_options').val();
    if(url != "Select the website you want to unblock")
    {
      chrome.storage.sync.get(['number', 'websites'], function(blocks)
      {
        let websites = JSON.parse(blocks.websites);
        let id = websites.indexOf(url);
        let number = blocks.number;
        EmptyDropdown("websites", number);
        websites.splice(id, 1);
        number--;
        $('#number').text(number);
        chrome.storage.sync.set({'websites' : JSON.stringify(websites), 'number' : number});
        LoadWeb();
        console.log("Website deleted: ", url);
        console.log("Number of websites: ", number, "Websites: ", websites);
      });
    };
  };
  // Unblock all websites
  function DelAllWeb()
  {
    chrome.storage.sync.get(['number'], function(blocks)
    {
      EmptyDropdown("websites", blocks.number);
    });
    $('#number').text("0");
    chrome.storage.sync.set({'number': 0, 'websites': JSON.stringify([]), 'last_block': "", 'Unlocked' : 0});
    console.log("All websites and block information have been cleared.");
  }

  // Click button to delete one website from dropdownmenu
  $('#DelWeb').click(function()
  {
    DelWeb();
  });
  // Click enter to delete one website from dropdownmenu
  $('#websites_options').keyup(function(event)
  {
    if(event.keyCode == 13)
    {
      DelWeb();
    }
  })
  // Click button to unblock all websites
  $('#sites').click(function()
  {
    DelAllWeb();
  });


  // Add flashcard
  function AddFlash()
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
  }

  // Click button to add new flashcard
  $('#AddFlash').click(function()
  {
    AddFlash();
  });
  // Click enter to add flashcard
  $("#frontAdd").keyup(function(event)
  {
    if (event.keyCode == 13)
    {
      AddFlash();
    }
  });
  $("#backAdd").keyup(function(event)
  {
    if (event.keyCode == 13)
    {
      AddFlash();
      $("#frontAdd").focus();
    }
  });


  // Delete one flashcard
  function DelFlash()
  {
    let card = $('#flashcards_options').val();
    if(card != "Select the flashcard you want to delete")
    {
      chrome.storage.sync.get(['front', 'back', 'numberFlash'], function(blocks)
      {
        let front = JSON.parse(blocks.front);
        let back = JSON.parse(blocks.back);
        let id = front.indexOf(card);
        let numberFlash = blocks.numberFlash;
        EmptyDropdown("flashcards", numberFlash);
        front.splice(id, 1);
        back.splice(id, 1);
        numberFlash--;
        $('#numberFlash').text(numberFlash);
        chrome.storage.sync.set({'front' : JSON.stringify(front), 'back' : JSON.stringify(back), 'numberFlash' : numberFlash});
        LoadFlash();
        console.log("Flahscard deleted: ", card);
        console.log("Number of flashcards: ", flashNumber, "Front: ", front, "Back: ", back);
      });
    };
  }
  // Delete all flashcards
  function DelAllFlash()
  {
    chrome.storage.sync.get(['numberFlash'], function(blocks)
    {
      EmptyDropdown("flashcards", blocks.numberFlash);
    });
    chrome.storage.sync.set({'numberFlash' : 0, 'front':JSON.stringify([]), 'back' :JSON.stringify([])});
    $('#numberFlash').text(0);
    console.log("All flashcards have been deleted.");
  }

  // Click button to delete one flashcard
  $('#DelFlash').click(function()
  {
    DelFlash();
  });
  // Click enter to delete one flashcard from dropdownmenu
  $('#flashcards_options').keyup(function(event)
  {
    if(event.keyCode == 13)
    {
      DelFlash();
    }
  })
  // Click button to delete all flashcards
  $('#DelAll').click(function()
  {
      DelAllFlash();
  });


  // Set block time or # flashcards
  function SetTF()
  {
    let nbr = $('#nbr').val();
    let time = $('#time').val();
    if(nbr == parseInt(nbr) && parseInt(nbr) > 0)
    {
      chrome.storage.sync.set({'nbr': parseInt(nbr)});
      $('#nbr').val('');
      console.log("Number of flashcards to do: ", nbr);
      chrome.storage.sync.set({'correct': 0}); // No cheating
    }

    if(Number.isFinite(parseFloat(time)) && parseFloat(time) > 0)
    {
      chrome.storage.sync.set({'time': parseFloat(time)});
      $('#time').val('');
      console.log("Procrastination time: ", time);
    }
  }

  // Click enter to set new block time or # flashcards
  $('#nbr').keyup(function(event)
  {
    if(event.keyCode == 13)
    {
      SetTF();
    }
  })
  $('#time').keyup(function(event)
  {
    if(event.keyCode == 13)
    {
      SetTF();
    }
  })
  // Click button to set block time or # flashcards
  $('#set').click(function()
  {
    SetTF()
  });


  // Reinitialize
  $('#Rein').click(function()
  {
    chrome.storage.sync.clear();
    chrome.storage.sync.get(['number', 'numberFlash'], function(blocks)
    {
      EmptyDropdown("websites", blocks.number);
      EmptyDropdown("flashcards", blocks.numberFlash);
    })
    chrome.storage.sync.set({'number': 0, 'numberFlash': 0, 'websites':JSON.stringify([]), 'front': JSON.stringify([]),
                          'back': JSON.stringify([]), 'last_block': "", 'Unlocked': 0, 'time' : 0.25, 'nbr': 10, 'correct':0});
    $('#numberFlash').text(0);
    $('#number').text(0);
    console.log("Procrastanki was successfully reinitialized.");
  });
});
