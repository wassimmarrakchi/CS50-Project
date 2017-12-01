$(function(){

  // Display the number of websites blocked near the "Blocked Sites" button
  chrome.storage.sync.get(['number', 'websites'], function(blocks){
    if(blocks.number)
    {
      $('#number').text(parseInt(blocks.number));
    }
    else
    {
      chrome.storage.sync.set({'number': 0});
      $('#number').text("0");
    }

    console.log("Number of websites: ", blocks.number, "Websites blocked: ", blocks.websites);
  })

  // Clear all blocked websites
  $('#sites').click(function(){
    chrome.storage.sync.clear();
    $('#number').text("0");
    chrome.storage.sync.set({'number': 0, 'websites': JSON.stringify([])});
    console.log("All websites have been cleared");
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

  // Redirects blocked websites
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['number', 'websites'], function(oldNumber){
      let number = parseInt(oldNumber.number);
      let websites = JSON.parse(oldNumber.websites);
      for(let i = 0; i < number; i++) {
        if (changeInfo.url == websites[i]) {
          chrome.tabs.update(null, {url:"http://en.wikipedia.org"});
          console.log("Url blocked: ", tab.url);
        }
      }
    });
  });
});
