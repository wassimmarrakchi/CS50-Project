// Redirects blocked websites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
    chrome.storage.sync.get(['number', 'websites', 'Unlocked'], function(oldNumber)
    {
      // Checks the time elapsed
      let d = new Date();
      if(d.getTime() - oldNumber.Unlocked >= 10 * 1000)
      {
        let url = "";
        let number = parseInt(oldNumber.number);
        let websites = JSON.parse(oldNumber.websites);
        for(let i = 0; i < number; i++)
        {
          url = "^.*" + websites[i] + ".*$";
          if (tab.url.match(url))
          {
            chrome.storage.sync.set({'last_block': tab.url, 'last_website': websites[i]});
            chrome.tabs.update({url:chrome.extension.getURL('flashcard.html')});
            console.log("Website blocked: ", tab.url);
          };
        };
      }
    });
});
