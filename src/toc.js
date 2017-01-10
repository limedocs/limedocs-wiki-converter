"use strict"

var path = require('path')
  , fs = require('fs-extra')
  , util = require('util')
  , marked = require('marked')

class Toc {

  /**
   *
   * @param {GWC} gwc
   */
  constructor(ld) {
    this.ld = ld
    this.computeTocParts()
  }

  getMarkdown() {
    return this.toc.tocMd
  }

  getHtml() {
    return this.toc.tocHtml
  }

  getItems() {
    return this.toc.tocItems
  }

  /**
   * @private
   */
  computeTocParts() {
    this.toc = {}
    this.toc.tocMd = this.getTocFileContents()

    let convertedToc = this.ld.getMarkdownConverter().convertTocMarkdownString(this.toc.tocMd)
    this.toc.tocHtml = convertedToc.tocHtml
    this.toc.tocItems = convertedToc.tocItems
  }

  /**
   * @private
   * @returns {String}
   */
  getTocFileContents() {
    var tocFile = this.ld.getTocFile()
    if (tocFile) {
      return fs.readFileSync(tocFile, {encoding: 'utf8'})
    }
    // if no toc file, generate contents from files
    return this.genTocFileContents()
  }

  /**
   * @private
   * @returns {string}
   */
  genTocFileContents() {
    return Object.keys(this.ld.getMarkdownFiles()).map(filename => {
      var basename = path.basename(filename)
      return util.format('- [%s](%s)', basename, basename)
    }).join('\n')
  }
}

module.exports = Toc
