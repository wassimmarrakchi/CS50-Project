$(function(){

  // Display the number of websites blocked near the "Blocked Sites" button
  chrome.storage.sync.get('number', function(blocks){
    $('#number').text(parseInt(blocks.number));
    console.log("The number of websites blocked already is ", blocks.number)
  })


  // Block a typed array
  $('#Block').click(function(){

      chrome.storage.sync.get('number', function(oldNumber){
        number = parseInt(oldNumber);
        console.log("The new number of websites blocked is ", number);
      });

      // Add the website to the list of blocked websites and increment by one the
      // number of websites blocked
      var url = $('#url').val().toString();
      if(url){
        number +=1;
        chrome.storage.sync.set({number : url})
        chrome.storage.sync.set({'number': number});
        $('#number').text(toString(number));
        $('#url').val('');
        };

        for(let i = 0; i < number; i++) {
          chrome.storage.sync.get(toString(i), function(result){
              console.log(result.i);
          });
        };
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
