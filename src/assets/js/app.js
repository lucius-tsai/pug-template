var respond_size = 1200;

$(document).ready(function($) {
  $( ".toggle_nav" ).bind( "click", toggleHandler );
  handleScrollIcon();
}).on( 'click', '.go_top', function(){
  var body = $("html, body");
  body.stop().animate({scrollTop:0}, 300, 'swing', function() { 
      
  });
});



function toggleHandler(e){
	if ($(window).width() < respond_size){
		e.preventDefault();
		

		$(this).toggleClass('active');
		$('body').toggleClass('modal-open');
		var target = $('header').find('.menu');
		if ($('.aside').length > 0) {
			target = $('.aside')
		}
		
		if (jQuery(this).hasClass('active')) {
      target.addClass('active');
			$('.search_ico').removeClass('active');
			$('.pin_ico').addClass('active');
			target.scrollTop(0);
		}else{
      target.removeClass('active');
			// slideOut(target);
			$('.search_ico').addClass('active');
			$('.pin_ico').removeClass('active');
		}
	}
};

$( window ).resize(function() {
	window_size = $(window).width();
	if (window_size < respond_size){
		$( ".toggle_nav" ).unbind( "click", toggleHandler )
		                  .bind( "click", toggleHandler );
	}else{
    $('body').removeClass('modal-open');
    cleanClass($('.toggle_nav'))
		cleanClass($('header .menu'))
	}
});
$(window).scroll(function (event) {
  handleScrollIcon();
});

function handleScrollIcon () {
  $('.go_top').hide();
  var scrollTop = $("html, body").scrollTop();
  if ( scrollTop > 100 ) {
    $('.go_top').show();
  }
  
}

function cleanClass(target){
	target.removeClass('active');
	target.removeClass('slide_out');
	target.removeClass('slide_in');
}