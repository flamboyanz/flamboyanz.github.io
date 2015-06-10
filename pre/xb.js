
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

       this.initialize();
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

        },

        initialize: function(){
            this.initStartIndex();
            if (this.initWidget() === false) {
                return false;
            }
            //this.initEventListeners();
            // Load the slide at the given index:
            this.onslide(this.index);

        },

        initWidget: function () {

            var that = this,
                openHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            openHandler
                        );
                        that.handleOpen();
                    }
                };
            this.container = $(this.options.container);
            if (!this.container.length) {
                this.console.log(
                    'xbmod Gallery: Widget container not found.',
                    this.options.container
                );
                return false;
            }
            this.slidesContainer = this.container.find(
                '.carousel-wrapper'
            )

            if (!this.slidesContainer.length) {
                this.console.log(
                    'xbmod Gallery: Slides container not found.',
                    this.options.slidesContainer
                );
                return false;
            }
            this.titleElement = this.container.find(
                this.options.titleElement
            ).first();
            if (this.num === 1) {
                this.container.addClass(this.options.singleClass);
            }
            if (this.options.onopen) {
                this.options.onopen.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    openHandler
                );
            } else {
                this.handleOpen();
            }
            if (this.options.hidePageScrollbars) {
                // Hide the page scrollbars:
                this.bodyOverflowStyle = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
            this.container[0].style.display = 'block';

            this.initSlides();
            //this.initCaptions();

            //this.buildControls();
            this.container.addClass(this.options.displayClass);
        },

        initSlides: function (reload) {

            var clearSlides,
                i;
            if (!reload) {
                this.positions = [];
                this.positions.length = this.num;
                this.elements = {};
                this.imagePrototype = document.createElement('img');
                this.elementPrototype = document.createElement('div');
                this.slidePrototype = document.createElement('div');
                $(this.slidePrototype).addClass(this.options.slideClass);
                //this.slides = this.slidesContainer[0].children;
                this.slides = []
                clearSlides = this.options.clearSlides ||
                    this.slides.length !== this.num;
            }


            this.slideWidth = this.container[0].offsetWidth;

            var containerWidth = document.body.clientWidth;

            this.slideWidth = ( this.slideWidth < document.body.clientWidth ) ? document.body.clientWidth : this.slideWidth;

            this.slideHeight = this.container[0].offsetHeight;

            this.slidesContainer[0].style.width =
                (this.num * this.slideWidth) + 'px';

            for (i = 0; i < this.num; i += 1) {
                if (clearSlides) {
                    this.addSlide(i);
                }

                this.positionSlide(i);

            }
            // Reposition the slides before and after the given index:
            if (this.options.continuous && this.support.transform) {

                this.move(this.circle(this.index - 1), -this.slideWidth, 0);
                this.move(this.circle(this.index + 1), this.slideWidth, 0);
            }
            if (!this.support.transform) {
                this.slidesContainer[0].style.left =
                    (this.index * -this.slideWidth) + 'px';
            }

        },

        addSlide: function (index) {
            var slide = this.slidePrototype.cloneNode(false);
            slide.setAttribute('data-index', index);
            this.slidesContainer[0].appendChild(slide);
            this.slides.push(slide);
        },

        positionSlide: function (index) {

            var slide = this.slides[index];

            slide.style.width = this.slideWidth + 'px';

            var tracy = this.index > index ? -this.slideWidth : (this.index < index ? this.slideWidth : 0)

            if (this.support.transform) {

                slide.style.left = (index * -this.slideWidth) + 'px';
                this.move(index, tracy, 0);
            }

        },

        onslide: function (index, check) {

            var base = this;
            this.index = index;
            this.handleSlide(index);
        },

        handleSlide: function (index) {

            this.loadElements(index);

        },

        circle: function (index) {

            // Always return a number inside of the slides index range:
            return (this.num + (index % this.num)) % this.num;
        },

        move: function (index, dist, speed, status) {

            this.translate(index, dist, speed);
            this.positions[index] = dist;

        },

        translate: function (index, dist, speed) {
            console.log(index, dist, speed)
            var y = 0;
            var style = this.slides[index].style,
                transition = this.support.transition,
                transform = this.support.transform;

            style[transition.name + 'Duration'] = speed + 'ms';
            style[transform.name] = 'translate(' + dist + 'px, ' + y + 'px)' +
                (transform.translateZ ? ' translateZ(0)' : '');

        },

        imageFactory: function (obj, callback) {

            var that = this,
                img = this.imagePrototype.cloneNode(false),
                url = obj.dataset.src,
                backgroundSize = this.options.stretchImages,
                called,
                element,
                callbackWrapper = function (event) {
                    if (!called) {
                        event = {
                            type: event.type,
                            target: element
                        };
                        if (!element.parentNode) {
                            // Fix for IE7 firing the load event for
                            // cached images before the element could
                            // be added to the DOM:
                            return that.setTimeout(callbackWrapper, [event]);
                        }
                        called = true;
                        $(img).off('load error', callbackWrapper);
                        if (backgroundSize) {
                            if (event.type === 'load') {
                                element.style.background = 'url("' + url +
                                    '") center no-repeat';
                                element.style.backgroundSize = backgroundSize;
                            }
                        }

                    }
                },
                title;

            /*if (typeof url !== 'string') {

             url = this.getItemProperty(obj[0], 'data-src');
             //caption = obj[1].innerHTML;
             title = this.getItemProperty(obj[0], this.options.titleProperty);

             }*/
            if (backgroundSize === true) {
                backgroundSize = 'contain';
            }
            backgroundSize = this.support.backgroundSize &&
                this.support.backgroundSize[backgroundSize] && backgroundSize;
            if (backgroundSize) {
                element = this.elementPrototype.cloneNode(false);
            } else {
                element = img;
                img.draggable = false;
            }
            if (title) {
                element.title = title;
            }
            $(img).on('load error', callbackWrapper);


            img.src = url;
            return element;
        },

        createCaptionElement: function(obj){

            var that = this,
                txt = obj.innerHTML,
                element = this.elementPrototype.cloneNode(false),
                p = document.createElement('p').cloneNode(false);
            //textNode = document.createTextNode(txt)


            p.innerHTML = txt
            element.appendChild(p)
            element.className = 'gallerycaption';

            return element;

        },


        createElement: function (obj, callback) {

            var type = obj && this.getItemProperty(obj, 'data-src');

            var factory = (type && this[type.split('/')[0] + 'Factory']) || this.imageFactory,
                element = obj && factory.call(this, obj, callback);
            if (!element) {
                element = this.elementPrototype.cloneNode(false);
                this.setTimeout(callback, [{
                    type: 'error',
                    target: element
                }]);
            }
            $(element).addClass(this.options.slideContentClass);

            return element;
        },

        loadElement: function (index) {


            if (!this.elements[index]) {

                if (this.slides[index].children[1]) {

                    this.elements[index] = $(this.slides[index])
                        .hasClass(this.options.slideErrorClass) ? 3 : 2;
                } else {

                    this.elements[index] = 1; // Loading
                    $(this.slides[index]).addClass(this.options.slideLoadingClass);

                    var insertNode = this.list[index].children[0];
                    var captionNode = this.slides[index].children[0];

                    /*this.slides[index].appendChild(this.createElement(
                     this.list[index].children[0],
                     this.proxyListener
                     ));*/

                    this.slides[index].insertBefore(this.createElement(
                        insertNode,
                        this.proxyListener
                    ), captionNode)



                }
            }
        },

        loadElements: function (index) {

            // preloadRange * 2 + 1
            var limit = Math.min(this.num, this.options.preloadRange + 1),
                j = index,
                i;
            for (i = 0; i < limit; i += 1) {
                // First load the current slide element (0),
                // then the next one (+1),
                // then the previous one (-2),
                // then the next after next (+2), etc.:
                j += i * (i % 2 === 0 ? -1 : 1);
                // Connect the ends of the list to load slide elements for
                // continuous navigation:
                j = this.circle(j);

                this.loadElement(j);
            }
        },

        getNodeIndex: function (element) {
            return parseInt(element.getAttribute('data-index'), 10);
        },

        getNestedProperty: function (obj, property) {
            property.replace(
                // Matches native JavaScript notation in a String,
                // e.g. '["doubleQuoteProp"].dotProp[2]'
                /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
                function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
                    var prop = dotProp || singleQuoteProp || doubleQuoteProp ||
                        (arrayIndex && parseInt(arrayIndex, 10));
                    if (str && obj) {
                        obj = obj[prop];
                    }
                }
            );
            return obj;
        },

        getDataProperty: function (obj, property) {
            if (obj.getAttribute) {
                var prop = obj.getAttribute('data-' +
                    property.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (typeof prop === 'string') {
                    if (/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/
                            .test(prop)) {
                        try {
                            return $.parseJSON(prop);
                        } catch (ignore) {}
                    }
                    return prop;
                }
            }
        },

        getItemProperty: function (obj, property) {
            var prop = obj[property];
            if (prop === undefined) {
                prop = this.getDataProperty(obj, property);
                if (prop === undefined) {
                    prop = this.getNestedProperty(obj, property);
                }
            }
            return prop;
        },

        initStartIndex: function () {
            var index = this.options.index,
                urlProperty = this.options.urlProperty,
                i;
            // Check if the index is given as a list object:
            if (index && typeof index !== 'number') {
                for (i = 0; i < this.num; i += 1) {
                    if (this.list[i] === index ||
                        this.getItemProperty(this.list[i], urlProperty) ===
                        this.getItemProperty(index, urlProperty)) {
                        index  = i;
                        break;
                    }
                }
            }
            // Make sure the index is in the list range:
            this.index = this.circle(parseInt(index, 10) || 0);
        }

    });

    return Gallery;
}));
