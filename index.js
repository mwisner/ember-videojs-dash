/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;
const replace = require('broccoli-string-replace');

module.exports = {
  name: 'ember-videojs-dash',

  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import({
      development: path.join('vendor/dash.all.debug.js'),
      production: path.join('vendor/dash.all.min.js')
    });

    app.import({
      development: path.join('vendor/videojs-dash.js'),
      production: path.join('vendor/videojs-dash.min.js')
    });

  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    //
    // Dash Library
    let dashLib = new Funnel(path.join(this.project.root, 'node_modules', 'dashjs', 'dist'));
    dashLib = map(dashLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    //
    // Need to replace sourcemap reference because uglify is Angry
    let clean = new replace(dashLib, {
      files: ['dash.all.min.js'],
      patterns: [{
        match: /\/\/# sourceMappingURL=dash.all.min.js.map/g,
        replacement: ''
      }],
      annotation: 'remove sourcemap annotation (dashjs)'
    });
    trees.push(clean);
    //
    // Videojs Dash
    let videojsDash = new Funnel(path.join(this.project.root, 'node_modules', 'videojs-contrib-dash', 'dist'));
    videojsDash = map(videojsDash, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
    trees.push(videojsDash);

    return new MergeTrees(trees);
  },
};
