import Ember from 'ember';
import layout from '../templates/components/video-test';

import videojs from 'videojs';

export default Ember.Component.extend({
  layout,
  tagName: 'video',
  classNames: ['video-js'],
  attributeBindings:['data-setup'],

  'data-setup': Ember.computed(function() {
    return '{"controls": true, "autoplay": false, "preload": "auto"}';
  }),

  didInsertElement() {
    this._super(...arguments);
    videojs(this.elementId);
    /**
    player.ready(function() {
      player.src({
        src: 'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd',
        type: 'application/dash+xml'
      });
    });
    **/
  }
});

