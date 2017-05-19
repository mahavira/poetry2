// 所有用到的词
import $ from 'jquery'
import Questions1 from './Questions1.json'
import Questions2 from './Questions2.json'
import Questions3 from './Questions3.json'
import Questions4 from './Questions4.json'
import Questions5 from './Questions5.json'
import { baseRandom } from './helper'
var allWords = ''
$.each(Questions1, function (i, n) {
  allWords += n.title.replace(/[,，\.。？?!！\s]/g, '')
})
$.each(Questions2, function (j, m) {
  allWords += m.title.replace(/[,，\.。？?!！\s]/g, '')
  allWords += m.options.replace(/[,，\.。？?!！\w\s]/gi, '')
})
$.each(Questions3, function (j, m) {
  allWords += m.content.replace(/[,，.。？?!！\s]/g, '')
})
$.each(Questions4, function (j, m) {
  allWords += m.title.replace(/[,，.。？?!！\s]/g, '')
  allWords += m.content.replace(/[,，\.。？?!！\s]/g, '')
})
$.each(Questions5, function (j, m) {
  allWords += m.content.replace(/[,，\.。？?!！\s]/g, '')
})

var reg = /(.)(?=.*\1)/g
allWords = allWords.replace(reg, '')
var allWordSize = allWords.length - 1
export default function randomGetWord () {
  var s = baseRandom(0, allWordSize)
  return allWords[s] || ''
}
