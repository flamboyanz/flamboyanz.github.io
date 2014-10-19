(function($){

    $(".card").on('click', function(event){
        $(this).toggleClass('hover');
        var self = $(this);
        $(this).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function(e){
               self.find('.bar blockquote:eq(0)').addClass('first');
               self.find('.bar blockquote:eq(1)').addClass('second');
               self.find('.bar blockquote:eq(2)').addClass('third');
            });

    })
})(jQuery)