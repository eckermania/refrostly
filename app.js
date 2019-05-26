'use strict';

// create hashtable to contain item names and current quantity in inventory
let inventory = {
  skis: 0,
  shovels: 0,
  sleds: 0,
  snowblowers: 0,
  winterTires: 0
}

// orders data includes: "order_id", "customer_id", "order_date", "item_ordered", "item_quantity", "item_price"
$.getJSON('./data/orders.json', function(json) {
  let sortedOrderObjs = json.sort(compareOrderDates);
  console.log('sortedOrderObj', sortedOrderObjs);
});

// restocks data includes: "restock_date", "item_stocked", "item_quantity", "manufacturer", "wholesale_price"
$.getJSON('/data/restocks.json', function(json){
  let sortedRestockObjs = json.sort(compareRestockDates);
  console.log('sortedRestockObj', sortedRestockObjs);
})

// helper function to sort order data according to order date
function compareOrderDates(a, b){
  if ( new Date(a.order_date) < new Date(b.order_date)){
    return -1;
  }
  if ( new Date(a.order_date) > new Date(b.order_date)){
    return 1;
  }
  return 0;
}

// helper function to sort restock data according to restock date
function compareRestockDates(a, b){
  if ( new Date(a.restock_date) < new Date(b.restock_date)){
    return -1;
  }
  if ( new Date(a.restock_date) > new Date(b.restock_date)){
    return 1;
  }
  return 0;
}
