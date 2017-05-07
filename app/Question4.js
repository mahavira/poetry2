import {shuffle} from './helper'
import Hint from './hint'
// 连线题
export default class Question4 {
  constructor (data) {
    $.extend(this, data)
    this.left = []
    this.right = []

    $.each(data, (i, n) => {
      var title = n.title
      var content = this[i].content.split("\n")
      this.left.push({
        text: title,
        index: i,
        selected: -1,
        isActive: false,
        isBind: false
      })
      this.right.push({
        text: content,
        index: i,
        isActive: false,
        isBind: false
      })
    })
    this.left = shuffle(this.left)
    this.right = shuffle(this.right)
    console.log(this)
  }
   /**
   * 记录点击
   */
  onSelected (lr,index,$box) {
    var prevItem = null
    var prevItemIndex = -1
    var currentItem = null
    var currentGroup = lr === 0  ? this.left: this.right
    currentItem = currentGroup[index]
    if (currentItem.isActive || currentItem.isBind) return false

    $.each(lr===1?this.right:this.left, (i,n) => {
      if (n.isActive && !n.isBind){
        n.isActive = false
        return
      }
    })

    $.each(lr===0 ? this.right : this.left, (i,n) => {
      if (n.isActive && !n.isBind){
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
      console.log(index,prevItemIndex)

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
    for(var i = 0;i < this.left.length;i++){
      if (!this.left[i].isBind || !this.right[i].isBind) {
        return -1
      }
     }
     // is right?
    for(var i = 0;i < this.left.length;i++){
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
    for(var i = 0;i < this.left.length;i++){
      this.left[i].isActive = false
      this.left[i].isBind = false
      this.right[i].isActive = false
      this.right[i].isBind = false
      $elem.leftBorder[i].scene.gotoAndPause(0)
      $elem.rightBorder[i].scene.gotoAndPause(0)
     }
  }

  sync () {
     for(var i = 0;i < this.left.length;i++){
        var isActive = this.left[i].isActive
        $elem.leftBorder[i].scene.gotoAndPause(isActive?1:0)
        isActive = this.right[i].isActive
        $elem.rightBorder[i].scene.gotoAndPause(isActive?1:0)
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
      for(var i = 0;i < this.left.length;i++){
        $elem.rowTop[i].text = this.right[i]['text'][0]
        $elem.rowBot[i].text = this.right[i]['text'][1]
        $elem.rowTitle[i].text = this.left[i].text
        $elem.leftBorder[i].scene.gotoAndPause(0)
        $elem.rightBorder[i].scene.gotoAndPause(0)
      }
  }
}
