/**
 * jquery.crossFade v0.1 - http://hideyukisaito.com/
 *
 * For simple crossFade effect.
 *
 * author: Hideyuki Saito (http://hideyukisaito.com/)
 * version: 0.1
 */
(function($) {
    $.fn.crossFade = function(current, options) {
        current = $(current);
        var defaults = {
            callbackIn : null,
            callbackOut: null,
            easingIn   : 'linear',
            easingOut  : 'linear',
            speedIn    : 1000,
            speedOut   : 1000
        };
        
        var settings = $.extend({}, defaults, options);
        
        return this.each(function() {
            current
                .stop()
                .animate({ opacity: 0 }, settings.speedOut, settings.easingOut, function() {
					if (settings.callbackOut && typeof settings.callbackOut === 'function') {
                        settings.callbackOut();
                    }
                });
            
            $(this)
                .stop()
                .animate({ opacity: 1 }, settings.speedIn, settings.easingIn, function() {
                    if (settings.callbackIn && typeof settings.callbackIn === 'function')
                        settings.callbackIn();
                });
        });
    }
})(jQuery);