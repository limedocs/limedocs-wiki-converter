"use strict"

var marked = require('marked')
  , highlight = require('highlight.js')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , datauri = require('datauri').sync
  , helpers = require('./helpers')


class Markdown {

  constructor(wikiPath) {
    this.wikiPath = wikiPath
    this.tocItems = []
    this.firstTocLiClassProcessed = false
    this.setupMainRenderer()
      .setupTocRenderer()
  }

  setupMainRenderer() {

    var self = this
    this.mainRenderer = new marked.Renderer()

    this.mainRenderer.code = function(code, lang) {
      code = lang === undefined ? highlight.highlightAuto(code) : highlight
        .highlight(lang, code)
      return `<pre class="hljs">${code.value}</pre>`
    }

    this.mainRenderer.link = function(href, title, text) {
      if (!href.match(/^https?:\/\//) || self.isTocLink(href)) {
        href = '#' + helpers.getPageIdFromFilenameOrLink(href)
      }
      return `<a href="${href}">${text}</a>`
    }

    this.mainRenderer.image = function(href, title, text) {
      if (!href.match(/^https?:\/\//)) {
        href = path.resolve(self.wikiPath, href)
        return util.format('<img src="%s" />', datauri(href))
      } else {
        return util.format('<img src="%s" />', href)
      }
    }
    return this
  }

  setupTocRenderer() {

    var self = this
    this.tocRenderer = new marked.Renderer()

    this.tocRenderer.list = function(body, ordered) {
      var tag = ordered ? 'ol' : 'ul'
      return `<${tag} class="nav gwc-nav">${body}</${tag}>`
    }

    this.tocRenderer.listitem = function(text) {
      self.tocLiCounter += 1
      var regs = text.match(/^([^<]+)/)
      if (regs) {
        text = '<span>' + text.substr(0, regs[0].length) + '</span>' + text
          .substr(regs[0].length)
      }

      if (!self.firstTocLiClassProcessed && text.substr(0, 2) === '<a') {
        self.firstTocLiClassProcessed = true
        return `<li class="active">${text}</li>`
      }

      return `<li>${text}</li>`
    }

    this.tocRenderer.link = function(href, title, text) {
      self.tocItems.push({
        title: text,
        link: href
      })
      href = helpers.getPageIdFromFilenameOrLink(href)
      return `<a href="#${href}">${text}</a>`
    }

    return this
  }

  convertTocMarkdownString(markdown) {
    return {
      tocHtml: this.convertMarkdownString(markdown, this.tocRenderer),
      tocItems: this.tocItems
    }
  }

  convertMarkdownString(markdown, renderer) {
    renderer = renderer || this.mainRenderer
    return marked(markdown, {
      renderer: renderer
    })
  }

  convertMarkdownFile(markdown_file) {
    return this.convertMarkdownString(fs.readFileSync(markdown_file, {
      encoding: 'utf8'
    }))
  }

  /**
   * @private
   * @returns {Boolean}
   */
  isTocLink(link) {
    for (let item of this.tocItems) {
      if (item.link == link) {
        return true
      }
    }
    return false
  }
}

module.exports = Markdown
