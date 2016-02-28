import React from 'react';
import { expect } from 'chai';
import mui from 'material-ui';

var { 
  CircularProgress,
  AppBar
} = mui;

var sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^I am on the home page$/, function() {
    this.visit('/');
  });

  this.Then(/^I should see "([^"]*)"$/, function(text) {
    expect(this.wrapper.find(AppBar).find('h1').text()).to.equal(text);
  });
}