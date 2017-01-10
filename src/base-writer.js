"use strict"

var fs = require('fs-extra')
  , path = require('path')
  , util = require('util')
  , logger = require('./logger')
  , Promise = require("bluebird")
  , datauri = require('datauri').sync

class BaseWriter {

  /**
   *
   * @param {GWC} GWC instance
   */
  constructor(ld) {
    this.ld = ld
  }

  write(filename, html) {
    var self = this
    return new Promise(function(resolve, reject) {
      fs.writeFile(filename, html, function(err) {
        if (err) {
          return reject(err)
        }
        logger.info(self.getExtension() + ' file written: %s', filename)
        resolve(filename)
      })
    })
  }

  getExtension() {
    throw new Error('You must define an getExtension() in your writer')
  }

  getFilename() {
    return path.join(this.ld.getOption('output'), this.ld.getOption('filename') + '.' + this.getExtension())
  }

  getCssTags() {
    return this.getAssetsTags(this.ld.getCssFiles(), 'css').join('\n')
  }

  getJsTags() {
    return this.getAssetsTags(this.ld.getJsFiles(), 'js').join('\n')
  }

  getLimedocsGeneratedImgData() {
    return datauri(path.resolve(__dirname, '../assets/images/Limedocs-generated.png'))
  }

  getExtraCss() {
    var tocLevel = this.ld.getOption('tocLevel'),
      tocLevelBaseCss = '> .gwc-nav > li '
    return '.gwc-nav > li ' + tocLevelBaseCss.repeat(tocLevel) + '{display: none;}'
  }

  getAssetsTags(files, type) {
    return files.map(function(file) {
      return this.getAssetSingleTag(file, type)
    }, this)
  }

  getAssetSingleTag(file, type) {
    var tplIn, tplOut

    if (type === 'js') {
      tplIn = '<script>%s</script>'
      tplOut = '<script src="%s" type="javascript"></script>'
    } else {
      tplIn = '<style>%s</style>'
      tplOut = '<link href="%s" rel="stylesheet" />'
    }

    return this.ld.getOption('disableInlineAssets') ?
      util.format(tplOut, path.basename(file)):
      util.format(tplIn, fs.readFileSync(file, {encoding : 'utf8'}))
  }

}

module.exports = BaseWriter
