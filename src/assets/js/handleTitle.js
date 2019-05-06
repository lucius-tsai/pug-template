var controlPoint = 1600;
var rwd = 992;
var imgBlock = $('.imgBlock');
$( document ).ready(function() {
	handleReszise()
})

$(window).resize(function(){
		handleReszise()
})

function handleTriangle(window_size) {
	var triangle = $('.powerSection h1.title .triangle');

	if ( window_size < rwd ) {
		triangle.css({
			borderTopWidth: '',
			borderLeftWidth: window_size
		})
	}else{
		var titleHeight = $('.powerSection h1.title').outerHeight();
		triangle.css({
			borderTopWidth: titleHeight + 'px',
			borderLeftWidth: ''
		});
	}
	
	
	
}
function handleReszise() {
	var window_size = $(window).width();
	
	if ( window_size < controlPoint && window_size > rwd) {
		// 拿次標題寬度
		var subTitleWidth = $('.subTitle').width();
		// 取左側間距
		var paddingLeft = 622 - ( 1600 - window_size )
		var centerPadding = ( window_size - subTitleWidth ) / 2;
		if ( paddingLeft < centerPadding ) {
			paddingLeft = centerPadding
		} 
		
		var scale = 1;
		if ( paddingLeft < 465 ) {
			scale = paddingLeft / 465;
		}
		var left = paddingLeft - 622;
		if (left <= -70) {
			left = -70;
		}
		imgBlock.css({ 
			transform: "scale(" + scale + "," + scale + ")",
			left: left
		});
		$('.subTitle').css({ marginLeft: paddingLeft });
		$('section.powerSection h1.title').css({ paddingLeft: paddingLeft });
	}else {
		imgBlock.css({ 
			transform: "",
			left: ''
		});
		$('.subTitle').css({ marginLeft: '' });
		$('section.powerSection h1.title').css({ paddingLeft: '' });
	}
	handleTriangle(window_size);
	
}