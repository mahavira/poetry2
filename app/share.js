/**
 * 初始化微信
 */
import { SHARE_DESC, templateShare, templateShareZero } from './constant'
if (typeof wx !== 'undefined') {
  setWxConfig()
}
var round = 0
var isReady = false
function setWxConfig () {
  try {
    wx.config({
      debug: false,
      appId: pdmi_appid,
      timestamp: pdmi_timestamp,
      nonceStr: pdmi_nonceStr,
      signature: pdmi_signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    })
    wx.ready(function () {
      isReady = true
      setShareContent(round)
    })
    wx.error(function(res){
      // alert('error:' + JSON.stringify(res))
    })
  } catch (e) {
    alert(e)
  }
}
export function setWxShare (title, desc) {
  var oA = document.createElement('a')
  oA.href = './share.jpg'
  var shareImg = oA.href
  var wx_data = {}
  wx_data.title = title
  wx_data.desc = desc || SHARE_DESC
  wx_data.imgUrl = shareImg
  wx_data.link = window.location.href
  if (typeof wx !== 'undefined') {
    wx.onMenuShareTimeline(wx_data)
    wx.onMenuShareAppMessage(wx_data)
  }
}

/**
 * 获取分享内容
 */
export default function setShareContent (ranking) {
  round = ranking
  if (!isReady) return
  if (!ranking) return setWxShare(templateShareZero)
  var title = templateShare.replace(/(\{\w*\})/g, function () {
    if (arguments[0] === '{ranking}') return ranking
  })
  title = title.replace(new RegExp('\n', 'g'), '，')
  setWxShare(title)
}