"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var path = require('path'),
    fs = require('fs-extra'),
    util = require('util'),
    marked = require('marked');

var Toc = (function () {

  /**
   *
   * @param {GWC} gwc
   */

  function Toc(ld) {
    _classCallCheck(this, Toc);

    this.ld = ld;
    this.computeTocParts();
  }

  _createClass(Toc, [{
    key: 'getMarkdown',
    value: function getMarkdown() {
      return this.tocMd;
    }
  }, {
    key: 'getHtml',
    value: function getHtml() {
      return this.tocHtml;
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.tocLinks;
    }

    /**
     * @private
     */
  }, {
    key: 'computeTocParts',
    value: function computeTocParts() {
      this.tocMd = this.getTocFileContents();
      this.tocHtml = this.ld.getMarkdownConverter().convertTocMarkdownString(this.tocMd);
      this.tocLinks = this.extractLinks();
    }

    /**
     * @private
     * @returns {String}
     */
  }, {
    key: 'getTocFileContents',
    value: function getTocFileContents() {
      var tocFile = this.ld.getTocFile();
      if (tocFile) {
        return fs.readFileSync(tocFile, { encoding: 'utf8' });
      }
      // if no toc file, generate contents from files
      return this.genTocFileContents();
    }

    /**
     * @private
     * @returns {string}
     */
  }, {
    key: 'genTocFileContents',
    value: function genTocFileContents() {
      return Object.keys(this.ld.getMarkdownFiles()).map(function (filename) {
        var basename = path.basename(filename);
        return util.format('- [%s](%s)', basename, basename);
      }).join('\n');
    }

    /**
     * @private
     * @returns {Array}
     */
  }, {
    key: 'extractLinks',
    value: function extractLinks() {
      var html = marked.parser(marked.lexer(this.tocMd));
      var links = [];

      html.replace(/<a href="([^"]+)"/g, function (all_pattern, link) {
        if (link.substr(link.length - 3) === '.md') {
          link = link.substr(0, link.length - 3);
        }
        links.push(link);
      });
      return links;
    }
  }]);

  return Toc;
})();

module.exports = Toc;
//# sourceMappingURL=toc.js.map