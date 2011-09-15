jQuery(document).ready(function($) {
	var postfix = '_o';
	$('#gnav a img, #howtogo .subnav a img, #report-top .mapBox .btnArea a img').not('[src*="'+ postfix +'."]').each(function() {
		var img = $(this);
		var src = img.attr('src');
		var src_hover = src.substr(0, src.lastIndexOf('.'))
		           + postfix
		           + src.substring(src.lastIndexOf('.'));
		$('<img>').attr('src', src_hover);
		img.hover(
			function() {
				img.attr('src', src_hover);
			},
			function() {
				img.attr('src', src);
			}
		);
	});
});
