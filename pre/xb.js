(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['./xbmod-helper'], factory);
    } else {
        // Browser globals:
        window.xbmod = window.xbmod || {};
        window.xbmod.Gallery = factory(
            window.xbmod.helper || window.jQuery
        );
    }
}(function ($) {
    'use strict';

    function Gallery(list, options) {
        if (document.body.style.maxHeight === undefined) {
            // document.body.style.maxHeight is undefined on IE6 and lower
            return null;
        }
        if (!this || this.options !== Gallery.prototype.options) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Gallery(list, options);
        }
        if (!list || !list.length) {
            this.console.log(
                'xbmod Gallery: No or empty list provided as first argument.',
                list
            );
            return;
        }
        this.list = list;
        this.num = list.length;

        jQuery(options.container).wrapInner("<div class='carousel-wrapper-outer'></div>");
        jQuery(options.container).find('.carousel-wrapper-outer').wrapInner("<div class='carousel-wrapper'></div>");

        //this.initOptions(options);

        //this.initialize();
    }

    jQuery.extend(Gallery.prototype, {


    });

    return Gallery;
}));