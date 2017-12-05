// Redirects blocked websites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
    chrome.storage.sync.get(['number', 'websites'], function(oldNumber)
    {
      let url = "";
      let number = parseInt(oldNumber.number);
      let websites = JSON.parse(oldNumber.websites);
      for(let i = 0; i < number; i++)
      {
        url = "^.*" + websites[i] + ".*$";
        if (tab.url.match(url))
        {
          chrome.tabs.update({url:chrome.extension.getURL('flashcard.html')});
          console.log("Url blocked: ", tab.url);
        };
      };
    });
});
