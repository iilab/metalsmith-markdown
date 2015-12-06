
var basename = require('path').basename;
var debug = require('debug')('metalsmith-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var marked = require('marked');
var Matcher = require('minimatch').Minimatch;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];
  var delete_files = options.delete_files || false;
  var matcher = new Matcher(options.pattern);

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      if (matcher.match(file)) {
        debug('checking file: %s', file);
        if (!markdown(file)) return;
        var data = files[file];
        var save = new Buffer(data.contents.toString());

        var dir = dirname(file);
        var html = basename(file, extname(file)) + '.html';
        if ('.' != dir) html = dir + '/' + html;

        debug('converting file: %s', file);
        var str = marked(data.contents.toString(), options);
        data.contents = new Buffer(str);
        keys.forEach(function(key) {
          data[key] = marked(data[key], options);
        });

        delete files[file];
        if (!delete_files) {
          files[file] = Object.assign({},data);
          files[file].contents = save;
        }
        files[html]= data;
      }
    });
    done()
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}