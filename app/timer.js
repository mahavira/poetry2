/**
 * 倒计时
 * @returns {timerFun}
 */
import {MAX_TIME} from './constant'
export default class Timer {
  constructor (clb) {
    this.callback = clb
    this.timer = null
    this.currentTime = MAX_TIME
  }
  replay () {
    clearTimeout(this.timer)
    this.currentTime = MAX_TIME
    $elem.currentProgress.scene.playSegment('progress')
    this.run()
  }
  pause () {
    clearTimeout(this.timer)
    $elem.currentProgress.scene.pause()
  }
  reset () {
    clearTimeout(this.timer)
    this.currentTime = MAX_TIME
    this.render()
  }
  play () {
    this.run()
  }
  run () {
    this.currentTime--
    if (this.currentTime >= 0) {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.run.bind(this), 1000)
    } else {
      this.callback()
    }
  }
}
