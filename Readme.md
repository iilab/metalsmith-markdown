
# metalsmith-markdown

  A Metalsmith plugin to convert markdown files.

## Installation

    $ npm install metalsmith-markdown

## Features

The `pattern` property of each rule should be a valid [minimatch](https://www.npmjs.org/package/minimatch) pattern. If the pattern matches the file the conversion will occur.

The ```delete``` option (```true``` by default) will remove the orinal markdown file while using ```false``` will keep both the source markdown file and the generated html file.

## CLI Usage

  Install via npm and then add the `metalsmith-markdown` key to your `metalsmith.json` plugins with any [Marked](https://github.com/chjj/marked) options you want, like so:

```json
{
  "plugins": {
    "metalsmith-markdown": {
      "pattern": "**/*.md",
      "delete": true,
      "smartypants": true,
      "gfm": true,
      "tables": true
    }
  }
}
```


## Javascript Usage

  Pass `options` to the markdown plugin and pass it to Metalsmith with the `use` method:

```js
var markdown = require('metalsmith-markdown');

metalsmith.use(markdown({
  pattern: '**/*.md',
  delete: true,
  smartypants: true,
  gfm: true,
  tables: true
}));
```

## License

  MIT