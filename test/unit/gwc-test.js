"use strict"

const GWC = require('../../')
    , path = require('path')

require('should')

describe('[GWC test-suite]', function() {

  const samples = [
    path.join(__dirname, '..', '..', 'samples', '0'),
    path.join(__dirname, '..', '..', 'samples', '1'),
    path.join(__dirname, '..', '..', 'samples', '2')
  ]

  describe('gwc = new GWC()', function() {
    it('should throw a TypeError when passing no argument', function () {
      (function() {
        new GWC()
      }).should.throw()
    })
  })

  describe('gwc = new GWC("/this/does/not/exists")', function() {
    it('should throw a TypeError when passing an invalid directory path', function () {
      (function() {
        new GWC('/this/does/not/exists')
      }).should.throw()
    })
  })

  describe('gwc = new GWC("<valid-path>")', function() {
    it('should return a GWC instance', function () {
      var g = new GWC(samples[0])
      g.should.be.instanceOf(GWC)
    })
  })

  describe('gwc.buildDocumentHeader(true)', function() {
    it('should build document header with css inlined', function () {
      var g = new GWC(samples[0])
      var header = g.buildDocumentHeader(true)
      header.should.be.String().and.containEql('<style>')
    })
  })

  describe('gwc.buildDocumentHeader(false)', function() {
    it('should build document header with css outlined', function () {
      var g = new GWC(samples[0])
      var header = g.buildDocumentHeader(false)
      header.should.be.String().and.containEql('<link href')
    })
  })

  describe('gwc.searchMarkdownFiles()', function() {
    it('should find md files', function (done) {
      var g = new GWC(samples[0])
      g.searchMarkdownFiles().then(function(result) {

        var files = result.files
        var aliases = result.aliases

        files.should.be.Object()
        Object.keys(files).length.should.equal(3)

        done()
      })
    })
  })

  describe('gwc.getTocFileContents([files])', function() {

    it('should return toc contents for sample 0', function() {
      var g = new GWC(samples[0])
      var toc = g.getTocFileContents()
      toc.should.be.String().and.not.be.empty()
    })

    it('should throw an error for sample 1', function() {
      var g = new GWC(samples[1])
      var toc = g.getTocFileContents()
      toc.should.be.String().and.be.empty()
    })

    it('should return toc contents for sample 2', function(done) {
      var g = new GWC(samples[2])
      g.searchMarkdownFiles().then(function(files) {
        var toc = g.getTocFileContents(files)
        toc.should.be.String().and.not.be.empty()
        done()
      })
    })
  })

  describe('gwc.extractLinksFromTocContents(contents)', function() {
    it('should return toc content links (24) for sample 0', function() {
      var g = new GWC(samples[0])
      var toc = g.getTocFileContents()
      var links = g.extractLinksFromTocContents(toc)
      links.should.be.Array().with.length(9)
    })
  })

  describe('gwc.generate()', function() {

    this.timeout(60000)

    it('should generate documentation', function(done) {
      var g = new GWC(samples[0], {highlightTheme : 'darkula'})
      g.generate().then(function(s) {
        done()
      })
    })
  })

})