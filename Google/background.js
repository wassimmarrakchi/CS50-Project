// Redirects blocked websites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("ping at", tab.url)
  chrome.storage.sync.get(toString(tab.url), function(block){
  	if (block != true) {
      chrome.storage.sync.get(['number', 'websites'], function(oldNumber){
        let number = parseInt(oldNumber.number);
        let websites = JSON.parse(oldNumber.websites);
        for(let i = 0; i < number; i++) {
          if (tab.url == websites[i]) {
            chrome.storage.sync.set({'visited' : tab.url});
            chrome.tabs.update({url:chrome.extension.getURL('flashcard.html')});
            console.log("Url blocked: ", tab.url);
          }
        }
      });
    }
  });
});
