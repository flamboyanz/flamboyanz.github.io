
/* global define, window, document, DocumentTouch */

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

        console.log(this)

        this.initOptions(options);

       // this.initialize();
    }

    $.extend(Gallery.prototype, {

        options: {
            // The Id, element or querySelector of the gallery widget:
            container: '.gallery',
            // The tag name, Id, element or querySelector of the slides container:
            slidesContainer: 'div',
            // The tag name, Id, element or querySelector of the title element:
            titleElement: 'h3',
            // The class to add when the gallery is visible:
            displayClass: 'xbmod-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'xbmod-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'xbmod-gallery-single',
            // The class to add when the left edge has been reached:
            leftEdgeClass: 'xbmod-gallery-left',
            // The class to add when the right edge has been reached:
            rightEdgeClass: 'xbmod-gallery-right',
            // The class to add when the automatic slideshow is active:
            playingClass: 'xbmod-gallery-playing',
            // The class for all slides:
            slideClass: 'slide',
            // The slide class for loading elements:
            slideLoadingClass: 'slide-loading',
            // The slide class for elements that failed to load:
            slideErrorClass: 'slide-error',
            // The class for the content element loaded into each slide:
            slideContentClass: 'slide-content',
            // The class for the "toggle" control:
            toggleClass: 'toggle',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the "play-pause" toggle control:
            playPauseClass: 'play-pause',
            // The list object property (or data attribute) with the object type:
            typeProperty: 'type',
            // The list object property (or data attribute) with the object title:
            titleProperty: 'title',
            // The list object property (or data attribute) with the object URL:
            urlProperty: 'href',
            // The gallery listens for transitionend events before triggering the
            // opened and closed events, unless the following option is set to false:
            displayTransition: true,
            // Defines if the gallery slides are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearSlides: true,
            // Defines if images should be stretched to fill the available space,
            // while maintaining their aspect ratio (will only be enabled for browsers
            // supporting background-size="contain", which excludes IE < 9).
            // Set to "cover", to make images cover all available space (requires
            // support for background-size="cover", which excludes IE < 9):
            stretchImages: false,
            // Toggle the controls on pressing the Return key:
            toggleControlsOnReturn: true,
            // Toggle the automatic slideshow interval on pressing the Space key:
            toggleSlideshowOnSpace: true,
            // Navigate the gallery by pressing left and right on the keyboard:
            enableKeyboardNavigation: true,
            // Close the gallery on pressing the Esc key:
            closeOnEscape: true,
            // Close the gallery when clicking on an empty slide area:
            closeOnSlideClick: true,
            // Close the gallery by swiping up or down:
            closeOnSwipeUpOrDown: true,
            // Emulate touch events on mouse-pointer devices such as desktop browsers:
            emulateTouchEvents: true,
            // Stop touch events from bubbling up to ancestor elements of the Gallery:
            stopTouchEventsPropagation: false,
            // Hide the page scrollbars:
            hidePageScrollbars: true,
            // Stops any touches on the container from scrolling the page:
            disableScroll: true,
            // Carousel mode (shortcut for carousel specific options):
            carousel: false,
            // Allow continuous navigation, moving from last to first
            // and from first to last slide:
            continuous: true,
            // Remove elements outside of the preload range from the DOM:
            unloadElements: false,
            // Start with the automatic slideshow:
            startSlideshow: false,
            // Delay in milliseconds between slides for the automatic slideshow:
            slideshowInterval: 5000,
            // The starting index as integer.
            // Can also be an object of the given list,
            // or an equal object with the same url property:
            index: 0,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The transition speed between slide changes in milliseconds:
            transitionSpeed: 600,
            // The transition speed for automatic slide changes, set to an integer
            // greater 0 to override the default transition speed:
            slideshowTransitionSpeed: undefined,
            // The event object for which the default action will be canceled
            // on Gallery initialization (e.g. the click event to open the Gallery):
            event: undefined,
            // Callback function executed when the Gallery is initialized.
            // Is called with the gallery instance as "this" object:
            onopen: undefined,
            // Callback function executed when the Gallery has been initialized
            // and the initialization transition has been completed.
            // Is called with the gallery instance as "this" object:
            onopened: undefined,
            // Callback function executed on slide change.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslide: undefined,
            // Callback function executed after the slide change transition.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslideend: undefined,
            // Callback function executed on slide content load.
            // Is called with the gallery instance as "this" object and the
            // slide index and slide element as arguments:
            onslidecomplete: undefined,
            // Callback function executed when the Gallery is about to be closed.
            // Is called with the gallery instance as "this" object:
            onclose: undefined,
            // Callback function executed when the Gallery has been closed
            // and the closing transition has been completed.
            // Is called with the gallery instance as "this" object:
            onclosed: undefined
        },

        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            toggleSlideshowOnSpace: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            startSlideshow: false
        },

        console: window.console && typeof window.console.log === 'function' ?
            window.console :
        {log: function () {}},

        // Detect touch, transition, transform and background-size support:
        support: (function (element) {
            var support = {
                    touch: window.ontouchstart !== undefined ||
                    (window.DocumentTouch && document instanceof DocumentTouch)
                },
                transitions = {
                    webkitTransition: {
                        end: 'webkitTransitionEnd',
                        prefix: '-webkit-'
                    },
                    MozTransition: {
                        end: 'transitionend',
                        prefix: '-moz-'
                    },
                    OTransition: {
                        end: 'otransitionend',
                        prefix: '-o-'
                    },
                    transition: {
                        end: 'transitionend',
                        prefix: ''
                    }
                },
                elementTests = function () {
                    var transition = support.transition,
                        prop,
                        translateZ;
                    document.body.appendChild(element);
                    if (transition) {
                        prop = transition.name.slice(0, -9) + 'ransform';
                        if (element.style[prop] !== undefined) {
                            element.style[prop] = 'translateZ(0)';
                            translateZ = window.getComputedStyle(element)
                                .getPropertyValue(transition.prefix + 'transform');
                            support.transform = {
                                prefix: transition.prefix,
                                name: prop,
                                translate: true,
                                translateZ: !!translateZ && translateZ !== 'none'
                            };
                        }
                    }
                    if (element.style.backgroundSize !== undefined) {
                        support.backgroundSize = {};
                        element.style.backgroundSize = 'contain';
                        support.backgroundSize.contain = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'contain';
                        element.style.backgroundSize = 'cover';
                        support.backgroundSize.cover = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'cover';
                    }
                    document.body.removeChild(element);
                };
            (function (support, transitions) {
                var prop;
                for (prop in transitions) {
                    if (transitions.hasOwnProperty(prop) &&
                        element.style[prop] !== undefined) {
                        support.transition = transitions[prop];
                        support.transition.name = prop;
                        break;
                    }
                }
            }(support, transitions));
            if (document.body) {
                elementTests();
            } else {
                $(document).on('DOMContentLoaded', elementTests);
            }
            return support;
            // Test element, has to be standard HTML and must not be hidden
            // for the CSS3 tests using window.getComputedStyle to be applicable:
        }(document.createElement('div'))),

        requestAnimationFrame: window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame,

        initOptions: function (options) {

            console.log('COMES')

            var base = this;

            // Create a copy of the prototype options:
            this.options = $.extend({}, this.options);
            // Check if carousel mode is enabled:
            if ((options && options.carousel) ||
                (this.options.carousel && (!options || options.carousel !== false))) {
                $.extend(this.options, this.carouselOptions);
            }
            // Override any given options:
            $.extend(this.options, options);
            if (this.num < 3) {
                // 1 or 2 slides cannot be displayed continuous,
                // remember the original option by setting to null instead of false:
                this.options.continuous = this.options.continuous ? null : false;
            }
            if (!this.support.transition) {
                this.options.emulateTouchEvents = false;
            }
            if (this.options.event) {
                this.preventDefault(this.options.event);
            }

            base.captionstate = false;

        }

    });

    return Gallery;
}));
