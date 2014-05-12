/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

var es = require("event-stream"),
    fs = require("fs"),
    path = require("path"),
    OptimizerSettings = require(path.join(__dirname, "/OptimizerSettings")),
    requirejs = require("requirejs");

module.exports = function (options) {
    options = new OptimizerSettings(options);
    console.log(options);

    return es.mapSync(function (file, cb) {
        console.log(file.path);

        return;

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
