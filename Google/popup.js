let blocked =[];


$(function(){
  $('#Block').click(function(){
    // Retrieves number of websites already blocked
    chrome.storage.sync.get('number', function(blocks){
      var number = 0;
      if(blocks.total)
      {
        number += parseInt(budget.total);
      }
    })

    // Add the website to the list of blocked websites and increment by one the
    // number of websites blocked
    var url = $('#url').val();
    if(url){
      blocked.append(string(url));
      number++;
    }
    $('#number').text(number);
    $('#url').text('');
  })
});
