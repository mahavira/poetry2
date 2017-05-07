import {baseRandom, shuffle} from './helper'
import randomGetWord from './allWords'
import Hint from './hint'
var gridTotal = 9 // 格子数
export default class Question {
  constructor (data) {
    $.extend(this, data)
    // 所有选填格子
    this.words = []
    // 错误的选填格子
    this.wordsEroor = []
    this.setPoem()
    this.answerSize = this.first.length
    var keywordIndex = baseRandom(0, this.answerSize - 1)
    this.keywordIndex = keywordIndex
    this.keyword = this.last[this.keywordIndex]
    // 当前索引
    this.index = this.keywordIndex ? 0 : 1
    // 回答格子
    var answers = []
    $.each(this.last, function (i, n) {
      answers.push(i === keywordIndex ? n : '')
    })
    this.answers = answers
    // this.answers = [...this.last]
    // 设置选填格子
    this.setWords()
    // 选填格子
    this.words = shuffle(this.words)
    this.copy()
    console.log(this)
  }
  /**
   * 从内容中设置上下诗句
   */
  setPoem () {
    var arr = this.content.split(/[《》,，.。？?!！\w\s]/)
    var max = arr.length - 1
    var w = this.getLine(0, max, arr)
    this.first = w.first
    this.last = w.last
    this.words = [...w.last]
  }
  getLine (min, max, arr) {
    var s = baseRandom(min, max)
    if (arr[s]) {
      if (s % 2 === 1) {
        s--
      }
      return {
        first: arr[s].split(''),
        last: arr[s + 1].split('')
      }
    }
    return this.getLine(min, max, arr)
  }
  /**
   * 设置Words
   */
  setWords () {
    var l = this.words.length
    for (var i = l; i < gridTotal; i++) {
      this.addWord()
    }
    this.words.splice(this.keywordIndex, 1)
    this.addWord()
  }
  /**
   * 随机添加一个不重复的字
   */
  addWord () {
    var w = randomGetWord()
    if (this.words.indexOf(w) < 0) {
      this.words.push(w)
      this.wordsEroor.push(w)
      return
    }
    this.addWord()
  }
  /**
   * 添加到回答格子
   */
  addAnswerWord (wordIndex) {
    var word = this.words[wordIndex]
    if (!word || this.index >= this.answerSize) {
      return
    }
    this.words[wordIndex] = ''
    this.answers[this.index] = word
    var i = this.answers.indexOf('')
    this.index = i < 0 ? this.answerSize : i
    this.syncRender()
  }
  /**
   * 移除回答格子
   */
  removeAnswerWord (index) {
    if (index === this.keywordIndex) {
      Hint('noRemoveKeyword')
      return
    }
    var word = this.answers[index]
    this.index = index
    this.answers[this.index] = ''
    if (word) {
      for (var i = 0; i < this.wordsCopy.length; i++) {
        if (word === this.wordsCopy[i] && !this.words[i]) {
          this.words[i] = word
          break
        }
      }
    }
    this.syncRender()
  }
  /**
   * 去除一个错误格子
   */
  removeErrorWord () {
    if (this.helpTotal <= 0) {
      Hint('noHelper')
      return
    }
    if (this.wordsEroor.length === 0) {
      Hint('noErrorWord')
      return
    }
    var s = baseRandom(1, this.wordsEroor.length) - 1
    var errorWord = this.wordsEroor[s]
    var i = this.words.indexOf(errorWord)
    if (i >= 0) {
      this.helpTotal--
      this.words[i] = ''
      this.wordsCopy[i] = ''
      this.wordsEroor.splice(s, 1)
      this.syncRender()
      return
    }
    i = this.answers.indexOf(errorWord)
    if (i >= 0) {
      this.helpTotal--
      this.answers[i] = ''
      var j = this.wordsCopy.indexOf(errorWord)
      this.wordsCopy[j] = ''
      this.wordsEroor.splice(s, 1)
      this.index = i

      this.syncRender()
      return
    }
    Hint('noErrorWord')
  }
  /**
   * 是否正确
   * -1 填写未完成
   * 0 错误
   * 1 正确
   */
  isRight () {
    var isFinish = true
    $.each(this.answers, function (i, n) {
      if (!n) {
        isFinish = false
      }
    })
    if (!isFinish) return -1
    var last = this.last.join('')
    var answer = this.answers.join('')
    if (last === answer) {
      return 1
    }
    return 0
  }
  /**
   * 备份
   */
  copy () {
    // 当前索引副本
    this.indexCopy = this.index
    // 回答格子副本
    this.answersCopy = [...this.answers]
    // 选填格子副本
    this.wordsCopy = [...this.words]
  }
  /**
   * 重置
   */
  reset () {
    this.words = [...this.wordsCopy]
    this.answers = [...this.answersCopy]
    this.index = this.indexCopy
    this.syncRender()
  }

  /**
   * 同步到视图
   */
  syncRender () {
    if (typeof $elem === 'undefined') {
      console.error('请接入Mugeda')
      return
    }
    var i = 0
    var k = 0
    for (i = 0; i < 5; i++) {
      $elem.lastBox[i].text = this.answers[i]
      $elem.lastBoxBorder[i].scene.gotoAndPause(this.index === i ? 1 : 0)
    }
    $.each(this.words, function (i, n) {
      $elem.wordBox[i].text = n
    })
  }
  
  /**
   * 渲染
   */
 
  render () {
    if (typeof $elem === 'undefined') {
      console.error('请接入Mugeda')
      return
    }
    var i = 0
    for (i = 0; i < 5; i++) {
      $elem.firstBox[i].text = this.first[i]
      $elem.lastBox[i].text = this.answers[i]
      setTimeout((i) => {
        console.log(i)
        $elem.lastBoxBorder[i].scene.gotoAndPause(this.index === i ? 1 : 0)
      }, 1000, i)
    }
    $.each(this.words, function (i, n) {
      $elem.wordBox[i].text = n
    })
  }
}
