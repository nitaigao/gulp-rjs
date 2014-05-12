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
        var destPath = path.join(file.cwd, options.baseUrl, path.basename(file.path)),
            stream = fs.createWriteStream(destPath, {
                "flags": "w"
            });

        stream.write(file.contents, "", function () {
            var name = path.basename(file.path).replace(path.extname(file.path), ""),
                outPath = path.join(options.baseUrl, name + ".js");

            console.log("node r.js -o baseUrl=" + options.baseUrl + " name=" + name + " out=" + outPath);

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
