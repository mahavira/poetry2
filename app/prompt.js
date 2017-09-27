var $prompt = null
var $promptContent = null
var $promptBg = null
var timer = null
export default function Prompt (text, time) {
  if (!$prompt) {
    $prompt = $('<div class="prompt"><div class="prompt-content"></div><div class="prompt-bg"><div class="prompt-left"></div><div class="prompt-right"></div><div class="prompt-top"></div><div class="prompt-bottom"></div></div></div>')
    $prompt.appendTo($('body'))
    $promptContent = $prompt.find('.prompt-content')
    $promptBg = $prompt.find('.prompt-bg')
    $prompt.on('click', function () {
      clearTimeout(timer)
      $prompt.hide()
    })
  }
  if (!text) return
  time = time || 2000
  $promptContent.html(text)
  $prompt.show()
  var height = $promptContent.outerHeight()
  var width = 222
  var winWidth = $(window).width()
  $prompt.css({
    height: height,
    marginTop: -height / 2,
    marginLeft: -width/2 + (70 / 640 * winWidth) / 2,
  })
  $promptBg.height(height * 2)
  clearTimeout(timer)
  timer = setTimeout(function () {
    $prompt.hide()
  }, time)
}
