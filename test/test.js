'use strict';

// load native chai functions
let expect = require('chai').expect;

//! COMMENT OUT THE AJAX CALLS IN APP.JS BEFORE RUNNING TESTS IF TESTING IN CLI!

//Tests

describe('APP.JS METHODS', function() {
  describe('compareOrderDates', function() {
    let compareOrderDates = require('../app.js').compareOrderDates;
    let objArray = [{name: 'a', date: 55}, {name:'b', date: 3}, {name:'c', date: 11}];
    let actual = objArray.sort(compareOrderDates);
    let expected = [{name:'b', date: 3}, {name:'c', date: 11}, {name:'a', date: 55}];

    it('should return an array', function() {
      expect(actual).to.be.a('array');
    });

    it('should sort objects by date', function() {
      expect(actual).to.deep.equal(expected);
    });
  });

})
