/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

/* global describe: false, it: false */

var assert = require("chai").assert,
    path = require("path"),
    gulp = require("gulp"),
    gulpr = require(path.join(global.paths.root, "/gulp-r")),
    requirejs = require("requirejs");

describe("gulp-r/gulpr", function () {
    var baseUrl = path.join(global.paths.root, "/gulp-r/fixtures/app/"),
        mainUrl = path.join(baseUrl, "/main.js"),
        req = requirejs.config({
            "baseUrl": baseUrl
        });

    it("loads raw uncompressed module", function () {
        req([mainUrl], function (main) {
            assert.deepEqual(main, ["main", "a", "b", "c", "d"]);
        });
    });

    it("minifies files with 'gulp'", function () {
        gulp.src(mainUrl)
            .pipe(gulpr({
            "baseUrl": baseUrl
        }));
    });
});
