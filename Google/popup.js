let blocked =[];


$(function(){
  $('#Block').click(function(){

      number = blocked.length;

      
      // Add the website to the list of blocked websites and increment by one the
      // number of websites blocked
      var url = $('#url').val();
      if(url){
        blocked.append(string(url));
        number +=1;
      }

      chrome.storage.sync.set({'number': number});

      $('#number').text(number);
      $('#url').val('');
    });
  });
});
