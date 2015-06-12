

/* global blueimp, $ */

$(function () {
    'use strict';

    // Initialize the Gallery as video carousel:
    blueimp.Gallery([
        {
            title: 'LES TWINS - An Industry Ahead',
            type: 'text/html',
            youtube: 'jnxn-vZM-Lg',
            poster: 'http://img.youtube.com/vi/jnxn-vZM-Lg/0.jpg'
        },
        {
            title: 'KN1GHT - Last Moon',
            type: 'text/html',
            youtube: '8YQChdbPXJ0',
            poster: 'http://img.youtube.com/vi/8YQChdbPXJ0/0.jpg'
        }
    ], {
        container: '#blueimp-video-carousel',
        carousel: true
    });

});
