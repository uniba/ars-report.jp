jQuery(document).ready(function($) {
	var postfix = '_o';
	$('#gnav a img, #howtogo .subnav a img, #topics .subnav a img, #report-top .mapBox .btnArea a img, .grid237 a img, .r672Box a img, .grid324 a img, .columnBox .grid208 a img').not('[src*="'+ postfix +'."]').each(function() {
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
