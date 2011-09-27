$(function() {
  $('#gnav ul li a').blend();
  
  var arrowContainer = '.arrowRight'
    , pageCount      = 0
    , thumbsPerPage  = 8
    , thumbBox       = $('.thumbBox > ul')
    , numPages       = thumbBox.children().length % thumbsPerPage != 0
                         ? Math.floor(thumbBox.children().length / thumbsPerPage + 1)
                         : thumbBox.children().length / thumbsPerPage;
  
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
    $(e.target)
      .unbind()
      .bind('mouseup', arrowMouseUpHandler);
   
  	var arrow      = $(this).children('img');
  	var src_hover  = getHoverSrc(arrow.attr('src'));
  	
  	arrow.attr('src', src_hover);
  	  	
  	if ($(e.target).parent().hasClass('arrowRight')) {
  	  ++pageCount;
  	  thumbBox.trigger('next', thumbsPerPage);
  	} else {
  	  pageCount = Math.max(0, --pageCount);
  	  thumbBox.trigger('prev', thumbsPerPage);
  	 }
  }
  
  function arrowMouseUpHandler(e) {
  	if (0 < pageCount && numPages - 1 > pageCount) {
  	  $('.arrowLeft')
  	    .unbind()
  	    .bind('mousedown', arrowMouseDownHandler)
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-left.png');
  	  
  	  $('.arrowRight')
  	    .bind('mousedown', arrowMouseDownHandler)
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right.png');
  	} else if (0 == pageCount) {
  	  $('.arrowLeft')
  	   .children('img')
  	   .attr('src', '../ref/images/report/01/arrow-left_off.png');
  	   
  	  $('.arrowRight')
  	    .unbind()
  	    .bind('mousedown', arrowMouseDownHandler)
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right.png');
  	} else if (numPages == pageCount + 1) {
  	  $('.arrowLeft')
        .unbind()
        .bind('mousedown', arrowMouseDownHandler)
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-left.png');
  	   
  	  $('.arrowRight')
  	    .children('img')
  	    .attr('src', '../ref/images/report/01/arrow-right_off.png');
  	}
  }
  
  $('#thumbnail > .arrowRight')
    .bind('mousedown', arrowMouseDownHandler);
    
  thumbBox.carouFredSel({
    auto: false,
    scroll: { duration: 500 }
  });
  
  function getHoverSrc(srcstr) {
  	return srcstr.substr(0, srcstr.lastIndexOf('.'))
  	     + (srcstr.indexOf('_o') == -1 ? '_o' : '')
     	 + srcstr.substring(srcstr.lastIndexOf('.'));
  }
});