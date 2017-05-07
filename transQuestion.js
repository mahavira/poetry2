var fs = require('fs')
var path = require('path')
var poetry = require('./questions.json')
var level = ['一级第一题随机', '一级第一题后随机', '二级随机', '三级随机', '四级随机', '五级随机', '习主席提到的']
var questions = {}
var str = JSON.stringify(poetry)
str = str.replace(/(\s)|(\\n)/g, '')
poetry = JSON.parse(str)

poetry.forEach(function (n, i) {
  var l = level.indexOf(n.level)
  if (!questions[l]) questions[l] = []
  n.level = l
  questions[l].push(n)
})
var json = JSON.stringify(questions)
fs.writeFile(path.join(__dirname, 'app/questions.json'), json)
console.info('questions.json 完成!')
// 所有字
var allWords = ''
var allWordsContent = ''
for (var n in questions) {
  questions[n].forEach(function (m, j) {
    allWordsContent += m.content
    allWords += (m.title + m.author + m.dynasty + m.source + m.content)
  })
}
var reg = /(.)(?=.*\1)/g
// 拼音
console.info('拼音开始!')
allWordsContent = allWordsContent.replace(reg, '') // 去重复
var pinyins = require('./pinyin.js')
var pinyin = {}
pinyins.split(',').map(function (n) {
  pinyin[n[0]] = n.substr(1)
})
var pin = []
for (var i=0;i<allWordsContent.length;i++) {
  if (pinyin[allWordsContent[i]]) {
    pin.push(allWordsContent[i] + pinyin[allWordsContent[i]])
  } else {
    console.log('没有找到:' + allWordsContent[i])
  }
}
var pinStr = pin.join(',')
pinStr = 'export default "' + pinStr + '"'
//fs.writeFile(path.join(__dirname, 'app/pinyin.js'), pinStr)
console.info('汉字大小：'+ allWordsContent.length)
console.info('拼音大小：'+ pin.length)

console.info('allWord 开始!')
allWords = allWords.replace(reg, '')
var jsdom = require('jsdom')
var data = fs.readFileSync('./font.html', 'utf-8')

jsdom.env(
  data,
  ['http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js'],
  function (errors, window) {
    var $ = window.$
    $('.allWords').text(allWords)
    fs.writeFile(path.join(__dirname, 'font.html'), $('html').html())
    console.info('allWord 完成!')
  }
)
