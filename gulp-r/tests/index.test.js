/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

/* global afterEach: false, beforeEach: false, describe: false, it: false */

var assert = require("chai").assert,
    gulp = require("gulp"),
    gulpr = require(path.join(global.paths.root, "/gulp-r")),
    mktemp = require("mktemp"),
    path = require("path"),
    requirejs = require("requirejs"),
    rimraf = require("rimraf");

describe("gulp-r/gulpr", function () {
    var baseUrl = path.join(global.paths.root, "/gulp-r/fixtures/app/"),
        destUrl,
        mainUrl = path.join(baseUrl, "/main.js"),
        req = requirejs.config({
            "baseUrl": baseUrl
        });

    afterEach(function (done) {
        mktemp.createDir("rjs-XXX", function (err, p) {
            assert.ifError(err);

            console.log(p);
            destUrl = p;
        });
    });

    beforeEach(function (done) {
        rimraf(destUrl, done);
    });

    it("loads raw uncompressed module", function () {
        req([mainUrl], function (main) {
            assert.deepEqual(main, ["main", "a", "b", "c", "d"]);
        });
    });

    it("minifies files with 'gulp'", function () {
        var options = {
            "baseUrl": baseUrl
        };

        gulp.src(mainUrl).pipe(gulpr(options));
        // .pipe(gulp.dest());
    });
});
