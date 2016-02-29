import React from 'react';
import { expect } from 'chai';
import mui from 'material-ui';
import _ from 'lodash';

var { 
  CircularProgress,
  AppBar,
  RaisedButton
} = mui;

let sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^I am on the home page$/, function() {
    this.visit('/');
  });

  this.Then(/^I should see "([^"]*)"$/, function(selector) {
    expect(this.wrapper.find(selector).length > 0).to.be.true;
  });

  this.Then(/^I should see a "([^"]*)" containing "([^"]*)"$/, function(selector, text) {    
    const bool = this.wrapper.find(selector).someWhere((node) => { return node.text() === text; });
    expect(bool).to.be.true;
  });
}