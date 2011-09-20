$(function() {
  $('#gnav ul li a').blend();
  
  var interval = setInterval(function() {
    var prev = $('.fadeitem.current')
      , next = prev.next().length ? prev.next() : $('.fadeitem')[0];
    
    $(next).crossFade(prev, {
      callbackIn: function() {
        $(prev).removeClass('current');
        $(next).addClass('current');
      },
      speedIn: 1000,
      speedOut: 1000
    });
  }, 4000);
});