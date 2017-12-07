// Redirects blocked websites
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
    chrome.storage.sync.get(['number', 'websites', 'Unlocked', 'time'], function(blocks)
    {
      // Checks the time elapsed
      let d = new Date();
      if(d.getTime() - blocks.Unlocked >= blocks.time * 60 * 1000)
      {
        let url = "";
        let number = parseInt(blocks.number);
        let websites = JSON.parse(blocks.websites);
        for(let i = 0; i < number; i++)
        {
          url = "^.*" + websites[i] + ".*$";
          if (tab.url.match(url))
          {
            chrome.storage.sync.set({'last_block': tab.url});
            chrome.tabs.update({url:chrome.extension.getURL('flashcard.html')});
            console.log("Website blocked: ", tab.url);
          };
        };
      }
    });
});
