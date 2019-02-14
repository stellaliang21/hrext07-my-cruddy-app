/*
Init app
interact with DOM
interact with localstoragevar dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
document.write(time);

 */

$(document).ready(function(){
  // this is where we jquery
  // var keyData = 'ourKey'; // going to need to make this dynamic?
  // this will keep the data from the local storage when the page is refreshed
  for (var key in localStorage) {
    var calories = localStorage.getItem(key);
    var d = new Date().toLocaleString();
      if (calories !== null && calories > 200 ) {
      $('.container-data').append('<div class="display-data-item" data-keyValue="'+key+'" data-valueData="'+calories+'">'+'😡 '+key + ': ' +calories+ ' calories    ' +d+ '</div>')
      } else if (calories !== null && calories < 200) {
      $('.container-data').append('<div class="display-data-item" data-keyValue="'+key+'" data-valueData="'+calories+'">'+'🥳 '+key + ': ' +calories+ ' calories     ' +d+ '</div>')
      }
    }



  $('#submit').on('click', function(e){
    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    // write to db
    
    // read from db
    // var displayText = keyData + ' : ' + localStorage.getItem(keyData) + ' calories';

    if (!Object.keys(localStorage).includes(keyData) && parseInt(valueData) > 200) { 
      localStorage.setItem(keyData, valueData);
      var d = new Date().toLocaleString();
        $('.container-data').append('<div class="display-data-item" data-keyValue="'+keyData+'" data-valueData="'+valueData+'">'+'😡 '+keyData + ': ' +valueData+ ' calories ' +d+ '</div>')
    
    } else if (!Object.keys(localStorage).includes(keyData) && parseInt(valueData) < 200) { 
      localStorage.setItem(keyData, valueData);
      var d = new Date().toLocaleString();
        $('.container-data').append('<div class="display-data-item" data-keyValue="'+keyData+'" data-valueData="'+valueData+'">'+'🥳 '+keyData + ': ' +valueData+ ' calories' +d+ '</div>')
    
    }
    
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app



    //$('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });


  // update db
    // need to expand when more than 1 item is added

  $("#update").on('click', function() {
    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    // localStorage.setItem(keyvalue, valueData);
    var d = new Date().toLocaleString();
    $(".display-data-item").each(function() {
      if ($(this).data('keyvalue') === keyData && parseInt(valueData) > 200) {
        $(this).text('😡 ' + keyData + ': ' + valueData + ' calories ' + d);
      } else if ($(this).data('keyvalue') === keyData && parseInt(valueData) < 200) {
        $(this).text('🥳 ' + keyData + ': ' + valueData + ' calories ' + d);
      }     
    })
  })


    //total calories
  $("#total").on('click', function() {
    var valueData = $('.input-value').val();
    var count = 0;

    $(".display-data-item").each(function() {
      console.log($(this).data('valuedata'));
      if (typeof $(this).data('valuedata') === 'number') {
     
      count += parseInt($(this).data('valuedata'), 10);
    }
    })
    // for (var key in localStorage) {
    //   var calories = localStorage.getItem(key)
    //   if (calories !== null) {
    //   count += parseInt(calories, 10)
    //   }
    // }
    $("#test").text('');
    $("#test").append( count + " total calories!");


  });





     
  $('#delete').on('click', function() {
    var keyData = $('.input-key').val();
    $(".display-data-item").each(function() {
      if ($(this).data('keyvalue') === keyData) {
        $(this).remove();

      }
    })
    localStorage.removeItem(keyData);
  })


  // delete item
  $('.container-data').on('click', '.display-data-item', function(e){
    console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    localStorage.removeItem(keyData);
    $('.container-data').text('');
  });
  // delete all?
  $('#clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

});