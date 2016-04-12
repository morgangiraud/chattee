import React from 'react';
import { expect } from 'chai';
import _ from 'lodash';

let sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^the app has loaded$/, function(callback) {
    // Allow any asynchronous behavior to happen before effectively testing things
    setTimeout(() => {
      callback()
    }, 0)
  });

  this.Given(/^I am on the home page$/, function() {
    this.visit('/');
  });

  this.Given(/^I wait for ([^"]*)s$/, function(seconds, callback) {
    setTimeout(() => {
      callback()
    }, seconds * 1000);
  });

  this.Then(/^I should see "([^"]*)"$/, function(selector) {
    expect(this.wrapper.find(selector).length > 0).to.be.true;
  });

  this.Then(/^I should see a "([^"]*)" containing "([^"]*)"$/, function(selector, text) {    
    const bool = this.wrapper.find(selector).someWhere((node) => { 
      return _.lowerCase(node.text().trim()) === _.lowerCase(text.trim()); 
    });
    expect(bool).to.be.true;
  });
  this.Then(/^I should see a "([^"]*)" containing exactly "([^"]*)"$/, function(selector, text) {    
    const bool = this.wrapper.find(selector).someWhere((node) => { return node.text() === text; });
    expect(bool).to.be.true;
  });
}