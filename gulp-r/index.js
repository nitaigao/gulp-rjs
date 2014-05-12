/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

var es = require("event-stream"),
    fs = require("fs"),
    path = require("path"),
    requirejs = require("requirejs");

module.exports = function (options) {
    return es.mapSync(function (file, cb) {
        console.log(file);
        return file;

        stream.write(file.contents, "", function () {
            var name = path.basename(file.path).replace(path.extname(file.path), ""),
                outPath = path.join(options.baseUrl, name + ".js");

            if (!options.name) {
                options.name = name;
            }
            if (!options.out) {
                options.out = outPath;
            }

            requirejs.optimize(options);
        });
    });
};
