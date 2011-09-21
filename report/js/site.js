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
  
  $('#thumbnail .arrow').click(function(e) {
  	var imgs = $(this).parent().children().not('.arrow');
  	imgs = Array.prototype.slice.call(imgs);
  	console.log(imgs);
  });
});