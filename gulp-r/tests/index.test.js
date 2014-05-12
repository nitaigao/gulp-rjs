/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

/* global describe: false, it: false */

var assert = require("chai").assert,
    path = require("path"),
    gulpr = require(global.paths.root + "/gulp-r"),
    requirejs = require("requirejs");

describe("gulp-r/gulpr", function () {
    var baseUrl = path.join(global.paths.root + "/gulp-r/fixtures/app/"),
        req;

    req = requirejs.config({
        "baseUrl": baseUrl
    });

    it("loads raw uncompressed module", function () {
        req([baseUrl + "main.js"], function (main) {
            assert.deepEqual(main, ["main", "a", "b", "c", "d"]);
        });
    });
});