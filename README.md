![Limedocs wiki converter](assets/images/Limedocs-wc.png)

# Limedocs Wiki Converter

Limedocs Wiki Converter allows you to generate HTML & PDF documentation from you Github wiki or any other markdown-based wiki.

# Prerequesites

- Node.js or io.js
- wkhtmltopdf (for pdf generation)

# Installation

```bash
npm install -g limedocs-wiki-converter
```

# Usage

## Basic usage

```bash
# Clone you github wiki for example
git clone https://github.com/limedocs/limedocs-wiki-converter.wiki.git

# Convert your wiki
ld-convert ./imedocs-wiki-converter.wiki
```

## Usage help
```
  Usage: ld-convert [options] <wiki-dir>

  Convert a wiki

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -f, --format <format>        Format to convert to. Either html, pdf, or all [default: html]
    -o, --output <output-dir>    Output dir [default: './']
    -t, --title <title>          Wiki title [default: Documentation]
    -d, --disable-inline-assets  Disable inlining of css & js in html document
    --toc <toc-file>             Wiki TOC file
    --toc-level <level>          Table of contents deep level [default: 3]
    --highlight-theme <theme>    Highlighter theme [default: darkula]
    --css <css-file>             Additional CSS file
    -v --verbose                 Verbose mode
```




## Table of contents

By default, GWC will check for the following files to use as a table of contents (TOC):

- `_Toc.md`
- `_Sidebar.md`
 
