"use strict"

var program = require('commander')
  , LimedocsWikiConverter = require('../limedocs-wiki-converter')

class Cli {

  constructor () {

    this.program = program.version(LimedocsWikiConverter.package.version)

      .usage('[options] <wiki-dir>')
      .description('Convert a wiki')

      .option("-f, --format <format>", "Format to convert to. Either html, pdf, or all [default: html]", 'html')
      .option("-o, --output <output-dir>", "Output dir [default: './']", './')

      .option("-t, --title <title>", "Wiki title [default: Documentation]", 'Documentation ')
      .option("-d, --disable-inline-assets", "Disable inlining of css & js in html document")

      .option("--toc <toc-file>", "Wiki TOC file")
      .option("--toc-level <level>", "Table of contents deep level [default: 3]", 4)

      .option("--highlight-theme <theme>", "Highlighter theme [default: darkula]", 'darkula')

      .option("--css <css-file>", "Additional CSS file")
      .option("-v --verbose", "Verbose mode")
/*
      .on('--help', function () {
        console.log('  Examples:')
        console.log()
        console.log('    $ ld-convert /path/to/my/wiki')
        console.log('    $ ld-convert --title "My doc" -output /another/dir /path/to/my/wiki')
        console.log()
      })*/
  }

  run() {
    this.program.parse(process.argv)
    if (!this.program.args.length) {
      this.program.help()
    }

    var options = {
      format: this.program.format,
      output: this.program.output,
      title: this.program.title,
      tocFile: this.program.toc,
      tocLevel: this.program.tocLevel,
      highlightTheme: this.program.highlightTheme,
      userCssFile: this.program.css,
      verbose: this.program.verbose || false,
      disableInlineAssets: this.program.disableInlineAssets || false
    }

    var ld = new LimedocsWikiConverter(this.program.args[0], options)
    ld.generate().then(function(result) {
      console.log(result.join('\n'))
      process.exit(0)
    }).catch(function(err) {
      process.exit(1)
    })
  }

}

if (require.main === module) {
  new Cli().run()
}

module.exports = Cli