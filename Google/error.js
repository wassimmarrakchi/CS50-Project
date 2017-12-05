$(function()
{
  $('#flashcard_redirect').click(function()
  {
    chrome.tabs.update({url:chrome.extension.getURL('popup.html')});
  });
});
