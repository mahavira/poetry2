import {MESSAGE} from './constant'
var $hint = null
var $hintContent = null
var timer = null
export default function Hint(code, time) {
  if (!$hint) {
    $hint = $('<div class="hint"><span class="hint-content"></span></div>')
    $hint.appendTo($('body'))
    $hintContent = $hint.find('.hint-content')
    $hint.on('click', function () {
      clearTimeout(timer)
      $hint.hide()
    })
  }
  if (!code) return
  time = time || 2000
  $hintContent.text(MESSAGE[code])
  $hint.show()
  clearTimeout(timer)
  timer = setTimeout(function () {
    $hint.hide()
  }, time)
}
