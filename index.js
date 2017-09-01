/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-videojs-dash',

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      let options = app.options.videojs || {};

      app.import({
        development: path.join('vendor/dash.all.debug.js'),
        production:  path.join('vendor/dash.all.min.js')
      });

      app.import({
        development: path.join('vendor/videojs-dash.js'),
        production:  path.join('vendor/videojs-dash.min.js')
      });

    }
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      new Funnel(path.join(this.project.root, 'node_modules', 'dashjs', 'dist'))
    );

    trees.push(
      new Funnel(path.join(this.project.root, 'node_modules', 'videojs-contrib-dash', 'dist'))
    );

    return new MergeTrees(trees);
  },
};
