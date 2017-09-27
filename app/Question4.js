import { shuffle } from './helper'
import Hint from './hint'
// 连线题
export default class Question4 {
  constructor (data) {
    this.left = []
    this.right = []
    this.number = 1
    this.data = data
    $.each(data, (i, n) => {
      var title = n.title
      var content = n.content.split('\n')
      this.left.push({
        text: title,
        index: i,
        selected: -1,
        isActive: false,
        isBind: false,
        number: 0
      })
      this.right.push({
        text: content,
        index: i,
        isActive: false,
        isBind: false,
        number: 0
      })
    })
    this.left = shuffle(this.left)
    this.right = shuffle(this.right)
    console.log(this)
  }

  /**
   * 记录点击
   */
  onSelected (lr, index, $box) {
    var prevItem = null
    var prevItemIndex = -1
    var currentItem = null
    var currentGroup = lr === 0 ? this.left : this.right
    currentItem = currentGroup[index]
    if (currentItem.isActive || currentItem.isBind) return false
    $.each(lr === 1 ? this.right : this.left, (i, n) => {
      if (n.isActive && !n.isBind) {
        n.isActive = false
        return
      }
    })

    $.each(lr === 0 ? this.right : this.left, (i, n) => {
      if (n.isActive && !n.isBind) {
        prevItem = n
        prevItemIndex = i
        return
      }
    })
    if (prevItem) {
      prevItem.isBind = true
      currentItem.isBind = true
      prevItem.selected = index
      currentItem.selected = prevItemIndex
      currentItem.number = this.number
      prevItem.number = this.number
      this.number += 1
      // console.log(index,prevItemIndex,this.number)

    }
    currentItem.isActive = true
    this.sync()
  }

  /**
   * 是否正确
   * -1 填写未完成
   * 0 错误
   * 1 正确
   */
  isRight () {
    // is complete?
    for (var i = 0; i < this.left.length; i++) {
      if (!this.left[i].isBind || !this.right[i].isBind) {
        return -1
      }
    }
    // is right?
    for (var i = 0; i < this.left.length; i++) {
      if (this.left[i].index !== this.right[this.left[i].selected].index) {
        return 0
      }
    }
    return 1
  }

  /**
   * 重置
   */
  reset () {
    for (var i = 0; i < this.left.length; i++) {
      this.left[i].isActive = false
      this.left[i].isBind = false
      this.right[i].isActive = false
      this.right[i].isBind = false
      this.right[i].number = 0
      this.right[i].number = 0
      this.number = 1
      $elem.leftBorder[i].scene.gotoAndPause(0)
      $elem.rightBorder[i].scene.gotoAndPause(0)
    }
  }

  sync () {
    for (var i = 0; i < this.left.length; i++) {
      var isActive = this.left[i].isActive
      var isBind = this.left[i].isBind
      var f = 0
      if (isActive && isBind) {
        f = this.left[i].number
      } else if (isActive) {
        f = this.number
      }
      console.log(f)
      $elem.leftBorder[i].scene.gotoAndPause(f)

      isActive = this.right[i].isActive
      isBind = this.right[i].isBind
      f = 0
      if (isActive && isBind) {
        f = this.right[i].number
      } else if (isActive) {
        f = this.number
      }
      console.log(f)
      $elem.rightBorder[i].scene.gotoAndPause(f)
    }
  }

  /**
   * 渲染
   */

  render () {
    if (typeof $elem === 'undefined') {
      console.error('请接入Mugeda')
      Hint('noMugeda')
      return
    }
    for (var i = 0; i < this.left.length; i++) {
      $elem.rowTop[i].text = this.right[i]['text'][0]
      $elem.rowBot[i].text = this.right[i]['text'][1]
      $elem.rowTitle[i].text = this.left[i].text
      $elem.leftBorder[i].scene.gotoAndPause(0)
      $elem.rightBorder[i].scene.gotoAndPause(0)
    }
  }

  getPrompt () {
    var html = ''
    $.each(this.data, (i, n) => {
      var title = n.title
      var content = n.content.replaceAll('\n', '<br/>')
      html += '<span style="font-size: 14px;">' + title + '</span><br/>'
      html += content + (i < this.data.length - 1 ? '<div class="prompt-line"></div>' : '')
    })
    return html
  }
}
