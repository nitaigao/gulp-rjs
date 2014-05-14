/**
 * @license Copyright (c) 2014 Nicholas Kostelnik
 * @license Copyright (c) 2014 Polacks
 * For licensing, see LICENSE
 */

"use strict";

var path = require("path"),
    libConfig = require("cruks-lib-config"),
    expect = libConfig.expect,
    // Reference = libConfig.Reference,
    Settings = libConfig.Settings;

/**
 * @auguments cruks-lib-config/Settings
 * @constructor
 * @param {*} options settings input
 */
function OptimizerSettings(options) {
    Settings.call(this, options);
}
OptimizerSettings.prototype = Object.create(Settings.prototype);

OptimizerSettings.prototype.expect = function () {
    return expect.schema({
        // "baseUrl": expect.some([
        // new Reference().no
        // expect.string().normalize(path.normalize),
        // ])
        "baseUrl": expect.string().normalize(path.normalize),
        "paths": expect.map(expect.string()).optional()
    }).strict(true);
};

module.exports = OptimizerSettings;