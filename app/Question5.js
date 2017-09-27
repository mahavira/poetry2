import { baseRandom, shuffle } from './helper'
import Hint from './hint'

// 排序题
export default class Question5 {
  constructor (data) {
    $.extend(this, data)
    // console.log(data)
    // 记录点击的次数,用来记载同步的位置
    this.num = 0
    // 存储替换位置的String
    this.activeString = ''
    // 记录最终结果
    this.finishString = []
    this.boxConter = []
    this.rightContent = this.content.split('\n')

    /**
     * 打乱后的数组
     */
    this.order = shuffle([...this.rightContent])
    this.orderSync = [...this.order]

    $.each(this.order, (i, n) => {
      this.boxConter.push({
        text: n,
        index: i,
        isSelect: false
      })
    })
    this.selected = []
    console.log(this)
  }

  /**
   * 记录选项
   */
  onSelected (index) {
    this.index = index
    var flag = true
    if (this.boxConter[index].isSelect) {
      flag = false
    }
    if (this.num > 3) return false
    if (flag) {
      // 转换位置
      this.activeString = $elem.T4Border[this.num].scene.getObjectByName('T4Row').text
      $elem.T4Border[this.num].scene.getObjectByName('T4Row').text = $elem.T4Border[this.index].scene.getObjectByName('T4Row').text
      $elem.T4Border[this.index].scene.getObjectByName('T4Row').text = this.activeString
      $elem.T4Border[this.num].scene.gotoAndPause(1)
      this.boxConter[this.num].isSelect = true
      this.num++
    }
  }

  /**
   * 是否正确
   * -1 填写未完成
   * 0 错误
   * 1 正确
   */
  isRight () {
    for (var i = 0; i < 4; i++) {
      this.finishString.push($elem.T4Border[i].scene.getObjectByName('T4Row').text)
    }
    if (this.finishString.toString() == this.rightContent.toString()) {
      return 1
    }
    return 0
  }

  /**
   * 重置
   */
  reset () {
    this.orderSync = [...this.order]
    this.selected = []
    this.num = 0
    for (var i = 0; i < 4; i++) {
      this.boxConter[i].isSelect = false
    }
    this.render()
  }

  /**
   * 渲染
   */

  render () {
    if (typeof $elem === 'undefined') {
      console.error('请接入Mugeda')
      return
    }
    for (var i = 0; i < 4; i++) {
      $elem.T4Border[i].scene.gotoAndPause(0)
      $elem.T4Border[i].scene.getObjectByName('T4Row').text = this.order[i]
    }
  }

  getPrompt () {
    return this.content.replaceAll('\n', '<br/>')
  }
}
