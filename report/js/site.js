$(function() {
  $('#gnav ul li a').blend();
  
  var arrowContainer = '.arrowRight'
    , thumbsPerPage  = 8
    , thumbBox       = $('.thumbBox > ul')
    , numPages       = thumbBox.children().length % thumbsPerPage != 0
                         ? Math.floor(thumbBox.children().length / thumbsPerPage + 1)
                         : thumbBox.children().length / thumbsPerPage
    , pageCount      = 0
    , thumbArrow;
  
  $('.thumbBox img').each(function(i) {
  	$(this).mouseover(function() {
  	  var src = this.src
  	    , src_hover = getHoverSrc(src);
  	  this.src = src_hover;
  	  $(this)
  	    .click(function() {
  	      var prev = $('.fadeitem.current')
  	        , next = $('.fadeitem')[i];
  	      
  	      $(next).crossFade(prev, {
  	      	callbackIn: function() {
  	      	  $(prev).removeClass('current');
  	      	  $(next).addClass('current');
  	      	},
  	      	speedIn: 500,
  	      	speedOut: 500
  	      });
  	    })
  	    .mouseout(function() {
  	  	  this.src = src;
  	    });
  	});
  });
  
  function arrowMouseDownHandler(e) {
    $(e.target).one('mouseup', arrowMouseUpHandler);
   
  	thumbArrow = $(this).children('img');
  	
  	var src_hover  = getHoverSrc(thumbArrow.attr('src'));
  	
  	thumbArrow.attr('src', src_hover);
  	
  	if ($(e.target).parent().hasClass('arrowRight')) {
  	  console.log('right');
  	  ++pageCount;
  	  thumbBox
  	    .animate({
  	  	  'marginLeft': '-' + 592 * Math.min(numPages, pageCount) + 'px'
  	  	}, 500);
  	} else {
  	  pageCount = Math.max(0, --pageCount);
  	  thumbBox
  	    .animate({
  	  	  'marginLeft': '+=' + 592 + 'px'
  	  	}, 500);
  	 }
  }
  
  function arrowMouseUpHandler(e) {
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
  
  function getHoverSrc(srcstr) {
  	return srcstr.substr(0, srcstr.lastIndexOf('.'))
  	     + (srcstr.indexOf('_o') == -1 ? '_o' : '')
     	 + srcstr.substring(srcstr.lastIndexOf('.'));
  }
});