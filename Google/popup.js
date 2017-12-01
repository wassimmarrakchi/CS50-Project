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
});

// chrome.tabs.onUpdated.addListener(function(url){
//   // for(let i = 0; i < number; i++) {
//   //         chrome.storage.sync.get(toString(i), function(result, url){
//   //             if (result == url)
//   //               chrome.tabs.update(integer tabId, object updateProperties, function callback);
//   //         });
//   if (url == 'https://www.google.com/') {
//     chrome.tabs.update({url:'https://reddit.com'});
//   }
// });

chrome.tabs.onUpdated.addListener(function(changeInfo) {
   alert(changeInfo.url);
}); 

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log(tab.url);
  });
}); 
