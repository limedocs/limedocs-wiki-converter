"use strict"

var fixtures = require('../fixtures')
  , Promise = require("bluebird")
  , should = require('should')

var path = require('path')

describe('Helpers', function() {

  describe('.getPageIdFromFilename()', function() {
    it('should not return .md suffix', function () {
      var id = fixtures.Helpers.getPageIdFromFilename('/path/to/index.md')
      id.should.equal('index')
    })
    it('should remove special characters', function () {
      var id = fixtures.Helpers.getPageIdFromFilename('/path/to/index~2$-Foo _bar-9876')
      id.should.equal('index~2-Foo_bar-9876')
    })
  })
})