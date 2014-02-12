'use strict';

var es = require('event-stream');
var fs = require('fs');

module.exports = function (aws, options) {
  return es.mapSync(function (file, cb) {
      var isFile = fs.lstatSync(file.path).isFile();
      if (!isFile) { return false; }
      console.log(file.path);
  });
};
