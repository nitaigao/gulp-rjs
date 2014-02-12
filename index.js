'use strict';

var es      = require('event-stream');
var fs      = require('fs');
var requirejs = require('requirejs');

//node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js

module.exports = function (aws, options) {
  return es.mapSync(function (file, cb) {
      var tmpPath = file.path.replace(file.base, '/tmp/');
      var stream = fs.createWriteStream(tmpPath, {flags: 'w'});
      stream.write(file.contents);

      

      fs.unlink(tmpPath);
  });
};
