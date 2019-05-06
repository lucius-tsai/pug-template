function scaleController () {
  var fightingDIV = $('.kungfuFighting');
  var gameContainerW = $('#open > .gameContainer').width(); // 取得外部寬度
  var scrollDIV = $('.kungfuScroll');
  var fightingW = fightingDIV.width(); // 取得功夫寬度
  
  var scrollW = scrollDIV.width(); // 取得 Scroll寬度

  var scale = gameContainerW / scrollW;
  var fightingScale = scrollW/fightingW;
  
  if ( $(window).width() < 768) {
    fightingDIV.css({
      transform: "scale(" + fightingScale + "," + fightingScale + ")",
      transformOrigin: '0px bottom'
    });
  }else{
    fightingDIV.css({
      transform: "",
      transformOrigin: ''
    });
  }
  if (scale < 1) {
    scrollDIV.css({
      transform: "scale(" + scale + "," + scale + ")",
      transformOrigin: '0px top'
    });

    var perspectiveHeight = 563 * scale;

    $('.kungfuContainer').css({
      height: perspectiveHeight + "px"
    });
    
  }else{
    scrollDIV.css({
      transform: "",
      transformOrigin: ''
    });
    $('.kungfuContainer').css({
      height: ""
    });
  }
}

function scaleContainer () {
  
  scaleController();
  
  // 控制筆刷位置
  var left = $('.introText').position().left + $('.introText').width();
  var gap = 110;

  if ($(window).width() < 1200) {
    gap = 0
  }
  
  if ($(window).width() < 992) {
    return $('#open .bursh_01').css({left: 'auto', right: 0})
  }

  $('#open .bursh_01').css({left: left+gap})

}

$(window).resize(function(){
  scaleContainer();
})

$(document).ready(function(){
  scaleContainer();
})