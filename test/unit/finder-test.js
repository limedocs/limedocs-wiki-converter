"use strict"

var fixtures = require('../fixtures')
  , Promise = require("bluebird")
  , should = require('should')

var path = require('path')

describe('Finder', function() {

  describe('.searchMarkdownFiles', function() {
    it('should find files and aliases', function (done) {
      var promise = fixtures.Finder.searchMarkdownFiles(fixtures.samples[0])
      promise.should.be.instanceOf(Promise)
      promise.then(function(results) {
        results.files.should.be.Object().and.not.be.empty()
        results.aliases.should.be.Object().and.not.be.empty()
        done()
      })
    })
    it('should error on a wrong dir', function (done) {
      var promise = fixtures.Finder.searchMarkdownFiles('/invalid/dir')
      promise.then(function(results) {

      }).catch(function(err) {
        done()
      })
    })
  })

  describe('.searchForFile', function() {
    it('should return a path for sample 0', function () {
      var path = fixtures.Finder.searchForFile(['_Toc.md', '_Sidebar.md'], fixtures.samples[0])
      path.should.be.String().and.not.be.empty()
    })
    it('should return null for sample 2', function () {
      var path = fixtures.Finder.searchForFile(['_Toc.md', '_Sidebar.md'], fixtures.samples[2])
      should(path).be.null()
    })
  })
})