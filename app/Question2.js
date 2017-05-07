import { shuffle } from './helper'
// 选择题
export default class Question2 {
  constructor (data) {
    $.extend(this, data)

    this.optionaAnsware = shuffle([...this.options])
    this.options = this.options.split('\n')
    switch (this.ans) {
      case 'A':
        this.ans = 0
        break
      case 'B':
        this.ans = 1
        break
      case 'C':
        this.ans = 2
        break
      case 'D':
        this.ans = 3
        break
    }
    console.log(this)
  }

  /**
   * 是否正确
   * -1 填写未完成
   * 0 错误
   * 1 正确
   */
  isRight () {
    if (this.selected === null || this.selected === undefined) {
      return -1
    }
    if (this.selected === this.ans) {
      return 1
    }
    return 0
  }

  /**
   * 重置
   */
  reset () {
    this.selected = null
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
    $elem.Question2Box.text = this.title
    for (var i = 0; i < $elem.option.length; i++) {
      $elem.optionSelect[i].scene.gotoAndPause(0)
      $elem.option[i].text = this.options[i]
    }
  }
}
