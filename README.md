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

```bash
# Clone you github wiki for example
git clone https://github.com/limedocs/limedocs-wiki-converter.wiki.git

# Convert your wiki
ld-convert ./imedocs-wiki-converter.wiki
```

## Table of contents

By default, GWC will check for the following files to use as a table of contents (TOC):

- `_Toc.md`
- `_Sidebar.md`
 
