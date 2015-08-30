"use strict"

var fixtures = require('../fixtures')
const path = require('path')

require('should')

describe('LimedocsWikiConverter', function() {

  var ld

  describe('new Ld()', function() {
    it('should throw a TypeError when passing no argument', function () {
      (function() {
        new fixtures.Ld()
      }).should.throw()
    })
  })

  describe('new Ld("/this/does/not/exists")', function() {
    it('should throw a TypeError when passing an invalid directory path', function () {
      (function() {
        new fixtures.Ld()('/this/does/not/exists')
      }).should.throw()
    })
  })

  describe('new Ld("<valid-path>")', function() {
    it('should return a LimedocsWikiConverter instance', function () {
      ld = new fixtures.Ld(fixtures.samples[0])
      ld.should.be.instanceOf(fixtures.Ld)
    })
  })

  describe('ld.getMarkdownFiles()', function() {
    it('should return an array', function () {
      ld.getMarkdownFiles().should.be.Array()
    })
  })

})