import Questions1 from './Questions1.json'
import Questions2 from './Questions2.json'
import Questions3 from './Questions3.json'
import Questions4 from './Questions4.json'
import Questions5 from './Questions5.json'
import Question1 from './Question1'
import Question2 from './Question2'
import Question3 from './Question3'
import Question4 from './Question4'
import Question5 from './Question5'
import { baseRandom } from './helper'
var discardQuestion = {} // 废弃的问题
/**
 * level: 关卡；type:当前第几题（答题形式）
 */
export default function getQuestion (level, type) {
  switch (level) {
    case 1:
      return getQuestion1(level)
      break
    case 2:
      return getQuestion2(level)
      break
    case 3:
      return getQuestion3(level)
      break
    case 4:
      return getQuestion4(level)
      break
    case 5:
      return getQuestion5(level)
      break
  }
}

/**
 * 1获取判断题
 */
function getQuestion1 () {
  var _poems = Questions1
  var poemSize = _poems.length - 1
  var index = baseRandom(0, poemSize)
  var poem = _poems[index]
  if (!poem) alert('出错了!诗词不够用')
  addDiscardQuestion(_poems, poem, index, '1')
  return new Question1(poem)
}

/**
 * 2.获取选择题
 */
function getQuestion2 () {
  var _poems = Questions2
  var poemSize = _poems.length - 1
  var index = baseRandom(0, poemSize)
  var poem = _poems[index]
  if (!poem) alert('出错了!诗词不够用')
  addDiscardQuestion(_poems, poem, index, '2')
  return new Question2(poem)
}

/**
 * 3.获取填空题
 */
function getQuestion3 () {
  var _poems = Questions3
  var poemSize = _poems.length - 1
  var index = baseRandom(0, poemSize)
  var poem = _poems[index]
  if (!poem) alert('出错了!诗词不够用')
  addDiscardQuestion(_poems, poem, index, '3')
  return new Question3(poem)
}

/**
 * 获取匹配题
 */
function getQuestion4 () {
  var _poems = Questions4
  var poemSize = _poems.length - 1
  var index = 0
  var poem = []
  for (var i = 0; i < 3; i++) {
    poemSize = _poems.length - 1
    index = baseRandom(0, poemSize)
    poem.push(_poems[index])
    if (!poem) alert('出错了!诗词不够用')
    addDiscardQuestion(_poems, _poems[index], index, '4')
  }
  return new Question4(poem)
}

/**
 * 获取排序题
 */
function getQuestion5 () {
  var _poems = Questions5
  var poemSize = _poems.length - 1
  var index = baseRandom(0, poemSize)
  var poem = _poems[index]
  if (!poem) alert('出错了!诗词不够用')
  addDiscardQuestion(_poems, poem, index, '5')
  return new Question5(poem)
}

export function resetQuestion (level) {
  level = level + ''
  if (!discardQuestion[level]) return
  switch (level) {
    case '1':
      $.each(discardQuestion[level], (i, n) => {
        Questions1.push(n)
      })
      break
    case '2':
      $.each(discardQuestion[level], (i, n) => {
        Questions2.push(n)
      })
      break
    case 3:
      $.each(discardQuestion[level], (i, n) => {
        Questions3.push(n)
      })
      break
    case '4':
      $.each(discardQuestion[level], (i, n) => {
        Questions4.push(n)
      })
      break
    case '5':
      $.each(discardQuestion[level], (i, n) => {
        Questions5.push(n)
      })
      break
  }
  discardQuestion = {}
}
function addDiscardQuestion (_poems, poem, index, level) {
  _poems.splice(index, 1)
  if (!discardQuestion[level])
    discardQuestion[level] = []
  discardQuestion[level].push(poem)
}

// console.log(questions, discardQuestion)
// resetQuestion()
// console.log(questions, discardQuestion)

// function testQuestion1 () {
//   $.each(Questions1, function (i,n) {
//     getQuestion(1)
//   })
// }
// testQuestion1()
/**
 * 检查诗是否成对
 */
// function testQuestion2 () {
//   $.each(Questions2, function (i,n) {
//     getQuestion(2)
//   })
// }
// testQuestion2()


// function testQuestion3 () {
//   $.each(Questions3, function (i,n) {
//     getQuestion(3)
//   })
// }
// testQuestion3()


// function testQuestion4 () {
//   var l = Math.floor(Questions4.length / 3)
//   for (var i = 0;i < l; i++) {
//     getQuestion(4)
//   }
// }
// testQuestion4()


// function testQuestion5 () {
//   $.each(Questions5, function (i,n) {
//     getQuestion(5)
//   })
// }
// testQuestion5()

/*
 import {LEVEL_SCALE, MAX_QUESTION} from './constant'
 var questionCount = 0
 var currentQuestion = {}
 function testQuestion3 () {
 questionCount++
 var level = 0
 if (questionCount % 5 === 0) {
 level = 6
 } else {
 $.each(LEVEL_SCALE, function (i, n) {
 if (questionCount < n) {
 level = i
 return false
 }
 })
 }
 currentQuestion = getQuestion(level)
 if (!currentQuestion) {
 return
 }
 console.log(questionCount, currentQuestion.level)
 }
 for (var i=0;i<MAX_QUESTION;i++) {
 testQuestion3()
 }
 */
