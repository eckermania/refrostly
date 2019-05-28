'use strict';

// constants
const successMessage = 'SUCCESS';
const outOfStockMessage = 'OUT OF STOCK';

// create hashtable to contain item names and current quantity in inventory
let inventory = {
  skis: 0,
  shovel: 0,
  sled: 0,
  snowblower: 0,
  tires: 0
};

// create array of objects containing order data - orders data includes: "order_id", "customer_id", "order_date", "item_ordered", "item_quantity", "item_price"
let orderData = {};

$.ajax({
  url: './data/orders.json',
  async: false,
  dataType: 'json',
  success: function(data) {
    orderData = data;
  }
});

// create array of objects containing restock data - restocks data includes: "restock_date", "item_stocked", "item_quantity", "manufacturer", "wholesale_price"
let restockData = {};

$.ajax({
  url: './data/restocks.json',
  async: false,
  dataType: 'json',
  success: function(data) {
    restockData = data;
  }
});

// create array of objects to create restock data that will trigger Out of Stock
let testRestockData = {};

$.ajax({
  url: './data/restocks.failtest.json',
  async: false,
  dataType: 'json',
  success: function(data) {
    testRestockData = data;
  }
});

// combine data sets into single array and sort by date
function combineEvents(orderEvents, restockEvents){
  let combinedEvents = orderEvents.concat(restockEvents);
  combinedEvents.forEach(el => el.date = el.order_date || el.restock_date);
  combinedEvents.sort(compareOrderDates);
  return combinedEvents;
}

// helper function to sort order data according to order date
function compareOrderDates(a, b){
  if ( a.date < b.date){
    return -1;
  }
  if ( a.date > b.date){
    return 1;
  }
  return 0;
}

// process events to update inventory table and respond to either out of stock or algorithm success
function processEvents (events){
  for(let i=0; i<events.length; i++){
    let item;
    if(events[i].hasOwnProperty('restock_date')){
      item = events[i].item_stocked;
      inventory[item]+= events[i].item_quantity;
    } else {
      item = events[i].item_ordered;
      let date = events[i].date;
      inventory[item] -= events[i].item_quantity;
      if(inventory[item]<0){
        displayFailure();
        displayFailureEvent(item, date);
        return;
      }
    }
  }
  displaySuccess();
  displaySurplus();
}

// method to populate status message and make visible if successful
function displaySuccess() {
  let status = document.getElementById('result');
  let statusMessage = document.getElementById('result-text');
  status.classList.remove('hidden');
  statusMessage.innerHTML = successMessage;
}

// method to populate surplus inventory table if successful
function displaySurplus() {
  let inventoryValues = Object.values(inventory);
  let inventoryKeys = Object.keys(inventory);
  let surplusContainer = document.getElementById('surplus-container');
  surplusContainer.classList.remove('hidden');
  let surplusTable = document.getElementById('surplus-table');

  for(let i=0; i<inventoryValues.length; i++){
    if(inventoryValues[i]>0){
      let newItem = document.createElement('td');
      let newQuant = document.createElement('td');
      let newRow = document.createElement('tr');
      newItem.textContent = inventoryKeys[i];
      newRow.appendChild(newItem);
      newQuant.textContent = inventoryValues[i];
      newRow.appendChild(newQuant);
      surplusTable.appendChild(newRow);
    }
  }
}

// method to populate status message and make visibile if failure
function displayFailure() {
  let status = document.getElementById('result');
  let statusMessage = document.getElementById('result-text');
  status.classList.remove('hidden');
  statusMessage.innerHTML = outOfStockMessage;
}

// method to populate Out of Stock table if failure
function displayFailureEvent(item, date) {
  let failureContainer = document.getElementById('out-container');
  failureContainer.classList.remove('hidden');
  let failureTable = document.getElementById('out-table');
  let newItem = document.createElement('td');
  let newDate = document.createElement('td');
  let newRow = document.createElement('tr');
  newItem.textContent = item;
  newRow.appendChild(newItem);
  newDate.textContent = date;
  newRow.appendChild(newDate);
  failureTable.appendChild(newRow);
}

// production creation of allEvents
let allEvents = combineEvents(orderData, restockData);

// test creation of allEvents from restocks.failtest.json - uncomment following line and comment above line to run test of out of stock functionality
// let allEvents = combineEvents(orderData, testRestockData);

// main function call
processEvents(allEvents);

// export methods for testing and authorization
module.exports = {
  compareOrderDates: compareOrderDates
}
