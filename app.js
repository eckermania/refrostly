'use strict';


$.getJSON('./data/orders.json', function(json) {
  console.log(json);
});
$.getJSON('/data/restocks.json', function(json){
  console.log(json);
})

