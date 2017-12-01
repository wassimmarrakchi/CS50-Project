let blocked =[];


$(function(){
  $('#Block').click(function(){

      number = blocked.length;


      // Add the website to the list of blocked websites and increment by one the
      // number of websites blocked
      var url = $('#url').val();
      if(url){
        blocked.push(url.toString());
        number +=1;
      }

      for(let i = 0; i < blocked.length; i++){
        console.log(blocked[i])
      }

      chrome.storage.sync.set({'number': number});
      $('#number').text(number);
      $('#url').val('');
    });
});
