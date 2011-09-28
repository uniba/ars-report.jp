$(function() {
  $('#gnav ul li a').blend();
  
  var arrowRight    = $('#thumbnail > .arrowRight')
    , arrowLeft     = $('#thumbnail > .arrowLeft')
    , originRight   = '../ref/images/report/01/arrow-right.png'
    , originLeft    = '../ref/images/report/01/arrow-left.png'
    , pageCount     = 0
    , thumbsPerPage = 8
    , thumbBox      = $('.thumbBox > ul')
    , numPages      = thumbBox.children().length % thumbsPerPage != 0
                        ? Math.floor(thumbBox.children().length / thumbsPerPage + 1)
                        : thumbBox.children().length / thumbsPerPage;
  
  $('.thumbBox img').each(function(i) {
  	$(this).mouseover(function() {
  	  var src = this.src
  	    , src_hover = getActiveSrc(src);
  	  
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
  
  function arrowClickHandler(e) {
    $(e.currentTarget).unbind('click');
    
    var arrowImg  = $(this).children('img')
    
    arrowImg.attr('src', getActiveSrc(arrowImg.attr('src')));
    
    if ($(e.currentTarget).get(0) == arrowRight.get(0)) {
      pageCount++;
      thumbBox.trigger('next', 8);
      
      if (pageCount > 0) {
        arrowLeft.click(arrowClickHandler);
      }
    } else if ($(e.currentTarget).get(0) == arrowLeft.get(0)) {
      pageCount = Math.max(0, pageCount - 1);
      thumbBox.trigger('prev', 8);
      
      if (pageCount < numPages - 1) {
        arrowRight.click(arrowClickHandler);
      }
    }
    
    var timeout = setTimeout(function() {
      arrowRight
        .children('img')
        .attr('src', pageCount == numPages - 1 ? getInactiveSrc(originRight) : originRight);
        
      arrowLeft
        .children('img')
        .attr('src', pageCount == 0 ? getInactiveSrc(originLeft) : originLeft);
      
      clearTimeout(timeout);
    }, 74);
  }
  
  arrowRight.click(arrowClickHandler);
    
  thumbBox.carouFredSel({
    auto: false,
    scroll: { duration: 500 }
  });
  
  function getActiveSrc(srcstr) {
  	return srcstr.substr(0, srcstr.lastIndexOf('.'))
  	     + (srcstr.indexOf('_o') == -1 ? '_o' : '')
     	 + srcstr.substring(srcstr.lastIndexOf('.'));
  }
  
  function getInactiveSrc(srcstr) {
    return srcstr.substr(0, srcstr.lastIndexOf('.'))
         + (srcstr.indexOf('_off') == -1 ? '_off' : '')
    	 + srcstr.substring(srcstr.lastIndexOf('.'));
  }
});