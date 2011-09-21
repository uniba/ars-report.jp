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
  
  
  var arrowContainer = '.arrowRight'
    , thumbsPerPage  = 8
    , thumbBox       = $('.thumbBox > ul')
    , numPages       = thumbBox.children().length % thumbsPerPage != 0
                         ? Math.floor(thumbBox.children().length / thumbsPerPage + 1)
                         : thumbBox.children().length / thumbsPerPage
    , pageCount      = 0
    , thumbArrow
    , src
    , src_hover;
  
  function arrowMouseDownHandler(e) {
    $(e.target).one('mouseup', arrowMouseUpHandler);
   
  	thumbArrow = $(this).children('img');
  	src        = thumbArrow.attr('src');
  	src_hover  = src.substr(0, src.lastIndexOf('.'))
  	           + (src.indexOf('_o') != -1 ? '_o' : '')
  	           + src.substring(src.lastIndexOf('.'));
  	
  	thumbArrow.attr('src', src_hover);
  	
  	if ($(e.target).parent().hasClass('arrowRight')) {
  	  console.log('right');
  	  ++pageCount;
  	  thumbBox
  	    .animate({
  	  	  'marginLeft': '-' + 592 * Math.min(numPages, pageCount) + 'px'
  	  	}, 2000);
  	} else {
  	  pageCount = Math.max(0, --pageCount);
  	  thumbBox
  	    .animate({
  	  	  'marginLeft': '+=' + 592 + 'px'
  	  	}, 2000);
  	 }
  }
  
  function arrowMouseUpHandler(e) {
  	
  	src = src_hover = '';
  	
  	if (0 < pageCount && numPages - 1 > pageCount) {
  	  $('.arrowLeft')
  	   .one('mousedown', arrowMouseDownHandler)
  	   .children('img')
  	   .attr('src', '../ref/images/report/01/arrow-left.png');
  	   
  	  $('.arrowRight')
  	    .one('mousedown', arrowMouseDownHandler)
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right.png');
  	} else if (0 == pageCount) {
  	  $('.arrowLeft')
  	   .children('img')
  	   .attr('src', '../ref/images/report/01/arrow-left_off.png');
  	   
  	  $('.arrowRight')
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right.png');
  	} else if (numPages == pageCount + 1) {
      $('.arrowLeft')
  	   .children('img')
  	   .attr('src', '../ref/images/report/01/arrow-left.png');
  	   
  	  $('.arrowRight')
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right_off.png');
  	}
  }
  
  $('#thumbnail > ' + arrowContainer)
    .one('mousedown', arrowMouseDownHandler);
});