"use strict"

var fixtures = require('../fixtures')
  , Promise = require("bluebird")

const path = require('path')

require('should')

describe('Finder', function() {

  describe('.searchMarkdownFiles', function() {
    it('should return a Promise', function (done) {
      var promise = fixtures.Finder.searchMarkdownFiles(fixtures.samples[0])
      promise.should.be.instanceOf(Promise)
      promise.then(function(results) {
        results.files.should.be.Object().and.not.be.empty()
        results.aliases.should.be.Object().and.not.be.empty()
        done()
      })
    })
  })
})