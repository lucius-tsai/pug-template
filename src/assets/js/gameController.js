var gameAnswers = []
var questions = [
  {
    name: '如果您想要擁有絕世武功，你想選擇那一種？',
    ans: {
      A: '威力驚人的降龍十八掌',
      B: '潛力無窮的乾坤大挪移'
    }
  },
  {
    name: '如果可以選一種武器，你想選？',
    ans: {
      A: '號令天下屠龍寶刀',
      B: '刀槍不入刺蝟軟甲'
    }
  },
  {
    name: '江湖之路難免會遇上仇家的挑釁，面對仇家您的第一反應是？',
    ans: {
      A: '好言相勸，您走您的陽關道，我過我的奈何橋',
      B: '奮力一博，畢竟有人的地方就有恩怨，這就是江湖'
    }
  },
  {
    name: '還記得初入江湖時您練武的初衷嗎？',
    ans: {
      A: '稱霸天下唯我不敗',
      B: '強身健體刀槍不入'
    }
  },
  {
    name: '萬一掉落絕情谷底，您希望誰陪您？',
    ans: {
      A: '會飛的神雕',
      B: '靠自己足智多謀的小技倆'
    }
  },
]

var handleScene = function(){
  var scene = 0;

  this.next = function () {
    scene = scene + 1
    changeScence(scene, true)
    return scene;
  }

  this.prev = function () {
    if (scene > 0) {
      scene = scene - 1
      changeScence(scene, false)
    }	
    return scene;
  }

  this.sceneNo = function () {
    return scene
  }
}

var scene = new handleScene();


// 工具
function showDIV(name){
  var showTest = $(name).css("display") === 'none';
  if (showTest) {
    $(name).css("display", "flex")
    .hide()
    .fadeIn();;
  }
}

// 換場動作
var changeScence = function (num, isNext) {
  var index = num - 1;
  
  
  if (num === 0) {
    $('#test').fadeOut();
    showDIV('#open');
  }
  if (num === 1) {
    $('#open').fadeOut();
    showDIV('#test');
  }
  if (num === 5) {
    showDIV('#test');
    $('#result').fadeOut();
  }
  if (num === 6) {
    $('#test').fadeOut();
    showDIV('#result');
  }
  var length = questions.length

  if ( index < length && index >= 0 ) {
    
    $('#question').html(questions[index].name)
    $('#answerA').html(questions[index].ans.A)
    $('#answerB').html(questions[index].ans.B)

    $('.answerBox .item').removeClass('active')
    if (gameAnswers[index]) {
      $('#'+gameAnswers[index]).addClass('active');
    }
    $('.gameProgress > div').each(function(key){
      if (key<=index){
        $(this).addClass('active')
      }else{
        $(this).removeClass('active')
      }
    })
    $('#goNextQuestion').prop('disabled', true);
  }
}



$(document).ready(function(){
  
  
}).on('click tap', '#startQu', function(e){
  scene.next()
}).on('click tap', '[id^=goNextQuestion]', function(e){
  scene.next()
  
  if (scene.sceneNo() === 6) {
    console.log('result', showResult())
  }
})
.on('click tap', '[id^=goPrevQuestion]', function(e){
  scene.prev()
})
.on('click tap', '.answerBox .item', function(){
  var index = scene.sceneNo() - 1 ;
  
  gameAnswers[index] = $(this).attr('id')
  
  $('.answerBox .item').removeClass('active')
  $(this).addClass('active')
  
  $('#goNextQuestion').prop('disabled', false);
  
})
function getQuestion() {
  var index = scene.sceneNo() - 1;
  return questions[index]
}
function showResult(){
  
  var length = gameAnswers.length
  var count = 0
  for (var i = 0; i < length ; i++){
    if (gameAnswers[i] === 'A') {
      count = count + 1;
    }
  }
  var resultNumber
  switch(count) {
    case 0:
      resultNumber = '1';
      break;
    case 1:
      resultNumber = '2';
      break;
    case 2:
      resultNumber = '3';
      break;
    case 3:
      resultNumber = '3';
      break;
    case 4:
      resultNumber = '4';
      break;
    case 5:
      resultNumber = '5';
      break;
    default:
      // code block
  }
  // $('[id^="result_"]').hide()
  // $('#result_'+resultNumber).show()
  console.log(resultNumber)
  window.location.href = './game_results/result_'+resultNumber+'.html?from=test';
  return resultNumber

}