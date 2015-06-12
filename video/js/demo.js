/*
 * blueimp Gallery Demo JS 2.12.1
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

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
