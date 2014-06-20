/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

var path = require("path"),
    fs = require("fs"),
    gutil = require("gulp-util"),
    mktemp = require("mktemp"),
    OptimizerSettings = require(path.join(__dirname, "/OptimizerSettings")),
    PLUGIN_NAME = "gulp-r",
    PluginError = gutil.PluginError,
    requirejs = require("requirejs"),
    rimraf = require("rimraf"),
    through = require("through2");

module.exports = function (options) {
    var stream;

    try {
        options = new OptimizerSettings(options);
    } catch (e) {
        throw new PluginError(PLUGIN_NAME, e.message);
    }

    stream = through.obj(function (file, enc, callback) {
        var name = path.basename(file.path).replace(path.extname(file.path), ""),
            that = this;

        if (file.isNull()) {
            return callback();
        }

        // if (file.isBuffer()) {
        //     file.contents = Buffer.concat([prefixText, file.contents]);
        // }

        // if (file.isStream()) {
        //     file.contents = file.contents.pipe(optimize(options));
        // }

        mktemp.createDir("gulp-r-XXX.out", function (err, p) {
            var out;

            if (err) {
                throw new PluginError(PLUGIN_NAME, err.message);
            }

            p = path.resolve(p);
            out = path.join(p, name);

            requirejs.optimize({
                "baseUrl": options.baseUrl,
                "name": name,
                "out": out,
                "paths": options.paths
            }, function () {
                fs.readFile(out, function (err, content) {
                    if (err) {
                        throw new PluginError(PLUGIN_NAME, err.message);
                    }

                    file.content = content;

                    that.push(file);

                    rimraf(p, callback);
                });
            });
        });
    });

    return stream;
};
