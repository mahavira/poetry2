import {RANK_SCALE,DIALOG_CONTENT} from './constant'
/**
 * 按分数获取头衔
 */
export function getRank (score) {
  var title = ''
  $.each(RANK_SCALE, function (i, n) {
    if (score <= n.maxScore) {
      title = n.title
      return false
    }
  })
  return title
}

/**
 * 获取头衔内容
 */
export function rankContent (score) {
  if (typeof score === 'undefined') {
    console.error('请提供score')
    alert('请提供score')
    return
  }
  var rank = null
  $.each(RANK_SCALE, function (i, n) {
    if (score <= n.maxScore) {
      rank = n
      return false
    }
  })
  if (!rank) rank = RANK_SCALE[RANK_SCALE.length-1]
  return Object.assign({}, rank)
}
/**
 * 获取头衔内容
 */
export function getRankContent (score) {
  var rank = rankContent(score)
  if (!rank) return
  rank.content = rank.content.replace(/(\{\w*\})/g, function () {
    if (arguments[0] === '{score}') return score
    if (arguments[0] === '{rank}') return '\n'
  })
  rank.content = rank.content.split('\n')
  return rank
}
// console.log(getRankContent(2))

export function getDialogContent (score) {
  var txt = DIALOG_CONTENT.replace(/(\{\w*\})/g, function () {
    if (arguments[0] === '{score}') return score
    if (arguments[0] === '{rank}') return getRank(score)
  })
  return txt
}
// console.log(getDialogContent(1))