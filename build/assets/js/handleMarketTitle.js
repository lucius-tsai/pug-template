$( document ).ready(function() {
	handleTitleHeight();
})

$(window).resize(function(){
		handleTitleHeight()
})

function handleTitleHeight(){
	var window_size = $(window).width();
	var ratio = 310 / 4262;
	
	$('.marketSection > .title').each(function(){
			var h = $(this).outerHeight()
			console.log()
			if ( ( h / window_size ) <  ratio ) {
				var minH = window_size * ratio
				$(this).css({ minHeight: minH });
			}
	});
}