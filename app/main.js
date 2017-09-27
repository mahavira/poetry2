import 'babel-polyfill'
import './main.css'
import Hint from './hint'
import Prompt from './prompt'
import Timer from './timer'
import setShareContent from './share'
import getQuestion, { resetQuestion } from './QuestionLibrary'
import { PASS_QUESTION_COUNT, MAX_PASS } from './constant'
import { fetchUserInfo, fetchScore, fetchRanking } from './fetch'
import { userinfo, ranking } from './mock'

var questionCount = 0 // 回答问题次数
var level = 0 //当前第几关
var score = 0 // 分数
var throughNum = 1 //当前用户闯关数
var currentQuestion = {} // 当前问题对象
var answerWrong = 0
var answerRight = 0
var isSubmit = false // 是否已提交
var timer = null // 倒计时对象
var mugeda = null
var mugedaScene = null
var scoreThrough = 0 // 记录关卡分数
var isRoundSuccess = false
var audio
// Mugeda元件对象
var $elem = {
  // home
  helpBtn: null,
  rankBtn: null,
  throughBtn: [],
  through: [],

  //through1
  Question1Box: null,
  judegBox: [],
  resetBtn: [],
  submitBtn: [],

  //through2
  Question2Box: null,
  optionBg: null,
  option: [],
  optionSelect: [],

  //through3
  firstBox: [],
  lastBox: [],
  lastBoxBorder: [],
  wordBox: [],

  //through4
  rowTitle: [],
  // rowAuthor: [],
  rowTop: [],
  rowBot: [],
  leftBorder: [],
  rightBorder: [],

  //through5
  T4Row: [],
  T4Border: [],

  //ranking
  reworkBtn: null,
  shareBtn: null,
  crosBoxs: [],
  succeedBox: []

}

window.$elem = $elem
/**
 * 初始化Mugeda
 $.getScript("http://0.0.0.0:3000/main.js?random=" + Math.random())
 */
if (window['Mugeda'] && window['Mugeda']['currentAni']) {
  console.log('Mugeda')
  mugeda = window['Mugeda']['currentAni']
  mugeda.addEventListener('renderReady', function () {
    console.log('renderReady', mugeda.getScene())

    mugedaScene = mugeda.getScene()

    // home
    $elem.helpBtn = mugedaScene.getObjectByName('helpBtn')
    $elem.rankBtn = mugedaScene.getObjectByName('rankBtn')
    for (var i = 1; i <= 5; i++) {
      $elem.throughBtn.push(mugedaScene.getObjectByName('throughBtn' + i))
    }
    for (var i = 1; i <= 5; i++) {
      $elem.through.push(mugedaScene.getObjectByName('through' + i))
    }

    //through1 判断题
    $elem.rightWrong = mugedaScene.getObjectByName('rightWrong')
    $elem.Question1Box = mugedaScene.getObjectByName('Question1Box')
    $elem.judegBoxRight = mugedaScene.getObjectByName('judegBox1')
    $elem.judegBoxWrong = mugedaScene.getObjectByName('judegBox2')

    //重置和确定按钮
    for (var i = 1; i <= 5; i++) {
      $elem.resetBtn.push(mugedaScene.getObjectByName('resetBtn' + i))
      $elem.submitBtn.push(mugedaScene.getObjectByName('submitBtn' + i))
      $elem.crosBoxs.push(mugedaScene.getObjectByName('crosBoxs' + i))
      $elem.succeedBox.push(mugedaScene.getObjectByName('succeedBox' + i))
      // $elem.succeedBox.x = 480
    }
    //through2
    $elem.Question2Box = mugedaScene.getObjectByName('Question2Box')
    $elem.optionBg = mugedaScene.getObjectByName('optionBg')
    for (var i = 1; i <= 4; i++) {
      $elem.optionSelect.push(mugedaScene.getObjectByName('optionSelect' + i))
      $elem.option.push($elem.optionSelect[i - 1].scene.getObjectByName('option' + i))
    }

    //through3
    var i = 1
    for (i = 1; i <= 9; i++) {
      $elem.wordBox.push(mugedaScene.getObjectByName('wordBox' + i))
    }
    for (i = 1; i <= 5; i++) {
      $elem.firstBox.push(mugedaScene.getObjectByName('firstBox' + i))
      $elem.lastBoxBorder.push(mugedaScene.getObjectByName('answerBox' + i))
      $elem.lastBox.push($elem.lastBoxBorder[i - 1].scene.getObjectByName('lastBox'))
    }

    //through4
    for (var i = 1; i <= 3; i++) {
      // 边框元件
      $elem.leftBorder.push(mugedaScene.getObjectByName('leftBorder' + i))
      $elem.rightBorder.push(mugedaScene.getObjectByName('rightBorder' + i))
    }
    for (var i = 1; i <= 3; i++) {
      // 左上
      $elem.rowTitle.push($elem.leftBorder[i - 1].scene.getObjectByName('row' + i + 'title'))
      // 右上
      $elem.rowTop.push($elem.rightBorder[i - 1].scene.getObjectByName('row' + i + 'Top'))
      // 右下
      $elem.rowBot.push($elem.rightBorder[i - 1].scene.getObjectByName('row' + i + 'Bot'))
    }

    // through5
    for (var i = 1; i <= 4; i++) {
      $elem.T4Row.push(mugedaScene.getObjectByName('T4Row' + i))
      $elem.T4Border.push(mugedaScene.getObjectByName('T4Border' + i))
    }

    $elem.progress = []
    $elem.currentProgress = null
    for (var i = 1; i <= 5; i++) {
      $elem.progress.push(mugedaScene.getObjectByName('progress' + i))
      $elem.progress[i - 1].scene.setSegment('progress', 1, 93, false)
    }

    $('.mugeda_render_object').css('font-family', 'founderSong')
    //ranking
    $elem.shareBtn = mugedaScene.getObjectByName('shareBtn')
    initGame()
  })
}

window.initGame = function () {
  playAudioBg()
  if (!timer) {
    timer = new Timer(timeOver)
  }
  fetchRound()
  setRanking()
  // setRankingRow(ranking)
  bindEvent()
}

window.toThrough = function (i, reminder) {
  if (i >= throughNum) {
    return
  }
  i += 1
  level = i
  questionCount = 0
  answerWrong = 0
  answerRight = 0
  scoreThrough = 0
  isRoundSuccess = false
  $elem.currentProgress = $elem.progress[i - 1]
  $elem.crosBoxs[i - 1].scene.getObjectByName('scrosP').text = 0
  mugedaScene.gotoPage(i + 3)
  resetQuestion(level)
  createQuestion()
  timer.pause()
  $elem.succeedBox[level - 1].x = 480
  if (reminder)
    succeedFun(0, level)
}

function playAudioBg() {
  audio = new Audio()
  audio.src = './591a9c7acb5963b0378b4988.mp3'
  audio.preload = true
  audio.loop = true
  if (window.WeixinJSBridge) {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
      audio.play();
    }, false);
  } else {
    document.addEventListener("WeixinJSBridgeReady", function () {
      WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        audio.play();
      });
    }, false);
  }
  $('body').append('<div id="audioDom" style="z-index: 20; position: absolute; right: 18px; top: 18px; display: block; transform: rotate(0deg);"><img width="24" class="mugine_audio_on" src="./59c24177d1e0febd008b476b.png"/></div>')
  $('#audioDom').click(function () {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  })
}
/**
 * 请求用户
 */
function fetchRound () {
  for (var i = 1; i < 5; i++) {
    $elem.through[i].scene.gotoAndPause(0)
  }
  fetchUserInfo(setRound)
}
function setRound (res) {
  if (!res.scores)
    res.scores = []
  //获取当前用户闯关数
  var lastRound = {round: 1}
  var maxRound = 1
  var score = 0
  $.each(res.scores, function (i, n) {
    if (n.round >= maxRound) {
      lastRound = n
      maxRound = n.round
    }
    score += n.score
  })
  setShareContent(0)
  if (lastRound.score > 6) maxRound++
  throughNum = maxRound

  for (var i = 1; i <= maxRound; i++) {
    if (i === 1) continue
    if (!$elem.through[i - 1]) continue
    $elem.through[i - 1].scene.gotoAndPause(1)
  }
}

function timeOver () {
  console.log('timeOver')
  var isRight = currentQuestion.isRight()
  if (isRight === -1 || isRight === 0) {
    Hint('answerWrong')
    answerWrong++
  } else {
    Hint('answerRight')
    answerRight++
  }
  nextQuestion()
}

/**
 * 创建问题
 */
function createQuestion () {
  currentQuestion = getQuestion(level, questionCount)
  $elem.rightWrong.scene.gotoAndPause(0)
  currentQuestion.render()
  questionCount++
  isSubmit = false
}
window.toRanking = function () {
  gotoRanking()
}
function gotoRanking () {
  mugedaScene.gotoPage(9)
  setRanking()
}
var dataRanking = null
function setRanking () {
  if (dataRanking === null) {
    var html = '<div style="margin:0;padding:20px;text-align:center;line-height:25px;font-family:serif;font-size:12px;">正在加载...</div>'
    $(mugedaScene.getObjectByName('rankingBox').dom).empty().append(html)
  }
  fetchRanking(function (data) {
    setRankingRow(data)
  })
  // setRankingRow(ranking)
}
function setRankingRow (data) {
  dataRanking = data
  var html = ''
  $.each(data.ranking, function (i, n) {
    html += getRankingRow(n)
  })
  html = '<div style="margin:0;padding:0;line-height:25px;font-family: serif;">' + html + '</div>'
  $(mugedaScene.getObjectByName('rankingBox').dom).css({'overflow-y': 'scroll'}).empty().append(html)
  if (data.myranking) {
    setShareContent(data.myranking.order)
    var htmlUser = '<div style="margin:0;padding:0;line-height:25px;font-family: serif;overflow: hidden;">' + getRankingRow(data.myranking) + '</div>'
    $(mugedaScene.getObjectByName('rankingUserBox').dom).html(htmlUser)
  }
}
function getRankingRow (n) {
  var html = ''
  html += '<div class="list-group-item" style="height:25px;font-size:12px;margin:15px 0;overflow: hidden;line-height: 25px;">'
  html += '<span class="score" style="width: 40px;float:right;text-align:right;padding-right: 15px;overflow: hidden;">' + (n.total_score) + '分</span>'
  html += '<span class="ranking" style="width: 50px;float:left;text-align:center;overflow: hidden;">' + (n.order) + '</span>'
  html += '<span class="headimg" style="width: 23px;height:23px;float:left;border-radius:50%;overflow: hidden;background:url(' + (n.headimgurl) + ') center no-repeat;background-size:cover;border:1px solid #7A7A7A;margin-left:5px"></span>'
  html += '<span class="nickname" style="width: 100px;float:left;padding-left:5px;overflow: hidden;">' + (n.nickname) + '</span>'
  html += '</div>'
  return html
}
// 获取下一题
function nextQuestion () {
  if (answerWrong === 3 && !isRoundSuccess) {
    // fetchScore(level, scoreThrough)
    succeedFun(-1, level)
    setTimeout(gotoRanking, 3000)
    return
  } else if (questionCount === PASS_QUESTION_COUNT) {
    fetchScore(level, scoreThrough)
    fetchRound()

    isRoundSuccess = true
    succeedFun(1, level)
    setTimeout(function () {
      if (level + 1 > MAX_PASS) {
        gotoRanking()
      } else {
        toThrough(level)
      }
    }, 3000)
    return
  }
  createQuestion()
  timer.replay()
}
// 计算关卡分数
var scoreRecord = function (index) {
  var s = 0
  if (timer.currentTime >= 18) {
    s = 5
  } else {
    s = timer.currentTime / 18 * 2 + 3
  }
  scoreThrough += s
  $elem.crosBoxs[index].scene.getObjectByName('scrosP').text = scoreThrough.toFixed(1)
}

var succeedFun = function (i, level) {
  level = level - 1
  $elem.succeedBox[level].left = 0
  // 闯关提示
  if (i === 0) {
    $elem.succeedBox[level].scene.getObjectByName('condition').visible = true
    $elem.succeedBox[level].scene.getObjectByName('succeed').visible = false
    $elem.succeedBox[level].scene.getObjectByName('defeat').visible = false
  }
  //闯关失败
  if (i === -1) {
    $elem.succeedBox[level].scene.getObjectByName('condition').visible = false
    $elem.succeedBox[level].scene.getObjectByName('succeed').visible = false
    $elem.succeedBox[level].scene.getObjectByName('defeat').visible = true
  }
  //闯关成功
  if (i === 1) {
    $elem.succeedBox[level].scene.getObjectByName('condition').visible = false
    $elem.succeedBox[level].scene.getObjectByName('succeed').visible = true
    $elem.succeedBox[level].scene.getObjectByName('defeat').visible = false
  }
  setTimeout(function () {
    $elem.succeedBox[level].left = 480
    i === 0 ? timer.replay() : null
  }, 3000)
}

function bindEvent () {
  $.each($elem.throughBtn, function (index, $box) {
    $box.addEventListener('click', function () {
      toThrough(index, true)
    })
  })

  // 九宫格
  $.each($elem.wordBox, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.addAnswerWord(index)
    })
  })
  $.each($elem.lastBoxBorder, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.removeAnswerWord(index)
    })
  })

  // 判断题
  $elem.judegBoxRight.addEventListener('click', function () {
    $elem.rightWrong.scene.gotoAndPause(1)
    currentQuestion.selected = 1
  })
  $elem.judegBoxWrong.addEventListener('click', function () {
    $elem.rightWrong.scene.gotoAndPause(2)
    currentQuestion.selected = 2
  })
  //选择题
  $.each($elem.optionSelect, function (index, $box) {
    $box.addEventListener('click', function () {
      for (var i = 0; i < 4; i++) {
        $elem.optionSelect[i].scene.gotoAndPause(0)
      }
      currentQuestion.selected = index
      $box.scene.gotoAndPause(1)

    })
  })
  //重置事件绑定
  $.each($elem.resetBtn, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.selected = -1
      currentQuestion.reset()
    })
  })
  // 判断对错
  $.each($elem.submitBtn, function (index, $box) {
    $box.addEventListener('click', function () {
      if (isSubmit) return
      var isRight = currentQuestion.isRight()
      if (isRight === -1) {
        Hint('noComplete')
        return
      } else if (isRight === 0) {
        isSubmit = true
        answerWrong++
        var prompt = currentQuestion.getPrompt()
        prompt = prompt.replace(/(^\s*)|(\s*$)/g, '')
        if (prompt) {
          Prompt(prompt)
          setTimeout(nextQuestion, 2000)
        } else {
          nextQuestion()
        }
      } else {
        isSubmit = true
        answerRight++
        scoreRecord(index)
        nextQuestion()
      }
      timer.pause()
    })
  })
  /**
   * 连线题点击事件绑定
   */
  $.each($elem.leftBorder, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.onSelected(0, index, $box)
    })
  })
  $.each($elem.rightBorder, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.onSelected(1, index, $box)
    })
  })
  /**
   * 排序题事件绑定
   */
  $.each($elem.T4Border, function (index, $box) {
    $box.addEventListener('click', function () {
      currentQuestion.onSelected(index)
    })
  })
}
