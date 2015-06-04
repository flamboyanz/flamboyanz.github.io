
(function($) {

    $.Vehicle360 = function(el, options) {

        var r = 1,

            s = false,
            o = 0,
            el = ".img360",
            a = options.imagePath,
            i = options.totalImages,
            c = options.imageExtension,
            $img = $(el).find('img');

        bindTouchEvents();

        function bindTouchEvents() {

            $(el).mousedown(function() {
                s = true
            });

            $(document).mouseup(function() {
                s = false
            });

            $(el).mousemove(function(e) {
                if (s == true) d(e.pageX - this.offsetLeft);
                else o = e.pageX - this.offsetLeft
            });

            $(el).bind("touchstart", function(e) {
                s = true;
                e.preventDefault();
                var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                o = t.pageX;
            });

            $(document).bind("touchend", function() {
                s = false;
            });

            $(el).bind("touchmove", function(e) {
                e.preventDefault();
                var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                if (s == true) revolution(t.pageX);
               else o = t.pageX;
            })
        }

        function revolution(t) {

            t = Math.floor(t);

            if (o - t > 25) {
                o = t
                r = ++r > i ? 1 : r;
                $img.attr('src', a + r + "." + c)

            } else if (o - t < -25) {
                o = t;
                r = --r < 1 ? i : r;
                $img.attr('src', a + r + "." + c)
            } else {

            }

        }

    }

    $.fn.extend({
        Vehicle360: function(options) {
            new $.Vehicle360(this, options);
        }
    });

})(jQuery);
