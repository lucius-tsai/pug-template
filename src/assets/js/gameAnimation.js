

var fadeKungfu = function () {
  var i = 0
  // var timer
  function loopAnimate(){
    $('.kungfuFighting > li:nth-child('+(i)+')').removeClass('active')
    i++
    if (i>5){
      i = 1
    }
    $('.kungfuFighting > li:nth-child('+i+')').addClass('active')

  }

  this.start = function () {
    loopAnimate()
    if (!this.timer) {
      this.timer = setInterval(loopAnimate, 2300);
    }
    
  }
  this.stop = function () {
    clearInterval(this.timer)
  }
}

var kungfuFighting = new fadeKungfu();

$(document).ready(function(){
  var openingCount = 1
  
  function handleFungFuOpen(){
    var aniName = 'bounceInUp';
    if (openingCount%2){
      aniName = 'bounceInDown';
    }
    if (openingCount===5){
      clearInterval(openInterval)
      setTimeout(kungfuFighting.start, 800)
    }
    $('.kungfuFighting > li:nth-child('+ openingCount +')').addClass(aniName)
    openingCount++
  }
  handleFungFuOpen()
  var openInterval = setInterval(handleFungFuOpen, 300)
  
}).on('mouseenter', '.kungfuFighting > li', function (){
  // $('.kungfuFighting > li').removeClass('active')
  // kungfuFighting.stop()
}).on('mouseleave', '.kungfuFighting', function (){
  // if (!kungfuFighting.timer) {
  //   kungfuFighting.start()
  // }
})