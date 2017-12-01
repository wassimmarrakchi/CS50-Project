// Redirects blocked websites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("ping at", tab.url)
  chrome.storage.sync.get(['number', 'websites'], function(oldNumber){
    let number = parseInt(oldNumber.number);
    let websites = JSON.parse(oldNumber.websites);
    for(let i = 0; i < number; i++) {
      if (tab.url == websites[i]) {
        chrome.tabs.update(null, {url:"http://en.wikipedia.org"});
        // chrome.windows.create({'url': 'http://en.wikipedia.org'});
        console.log("Url blocked: ", tab.url);
      }
    }
  });
});
