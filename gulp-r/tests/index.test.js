/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

/* global afterEach: false, before: false, beforeEach: false, describe: false, it: false */

var assert = require("chai").assert,
    fs = require("fs"),
    path = require("path"),
    gulp = require("gulp"),
    gulpr = require(path.join(global.paths.root, "/gulp-r")),
    mktemp = require("mktemp"),
    requirejs = require("requirejs"),
    rimraf = require("rimraf"),
    through = require("through2");

describe("gulp-r/gulpr", function () {
    var baseUrl = path.join(global.paths.root, "/gulp-r/fixtures/app/"),
        destUrl,
        mainUrl = path.join(baseUrl, "/main.js"),
        req = requirejs.config({
            "baseUrl": baseUrl
        });

    afterEach(function (done) {
        rimraf(destUrl, done);
    });

    beforeEach(function (done) {
        mktemp.createDir("rjs-XXX.cache", function (err, p) {
            assert.ifError(err);

            destUrl = path.resolve(p);

            done();
        });
    });

    it("loads raw uncompressed module", function () {
        req([mainUrl], function (main) {
            assert.deepEqual(main, ["main", "a", "b", "c", "d"]);
        });
    });

    describe("#property()", function () {
        var correct;

        before(function (done) {
            var fxPath = path.join(global.paths.root, "/gulp-r/fixtures/out/correct");

            fs.readFile(fxPath, function (err, content) {
                assert.ifError(err);

                correct = content.toString("utf-8").trim();

                done();
            });
        });

        it("minifies files with 'gulp'", function (done) {
            var called = false,
                options = {
                    "baseUrl": baseUrl
                };

            gulp.src(mainUrl)
                .pipe(gulpr(options))
                .pipe(through.obj(function (file, enc, callback) {
                    called = true;

                    assert.strictEqual(correct, file.content.toString(enc).trim());

                    this.push(file);

                    callback();
                }))
                .pipe(gulp.dest(destUrl))
                .on("end", function () {
                assert.ok(called);

                done();
            });
        });
    });
});
