// 判断题
export default class Question1 {
  constructor (data) {
    $.extend(this, data)
    this.selected = -1
    this.ans = this.ans === '正确' ? 1 : 2
    console.log(this)
  }

  /**
   * 是否正确
   * -1 填写未完成
   * 0 错误
   * 1 正确
   */
  isRight () {
    if (this.selected === null || this.selected === undefined || this.selected === -1) {
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
    $elem.rightWrong.scene.gotoAndPause(0)
  }

  /**
   * 渲染
   */
  render () {
    if (typeof $elem === 'undefined') {
      console.error('请接入Mugeda')
      return
    }
    $elem.Question1Box.text = this.title
  }
}
