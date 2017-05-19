/**
 * 初始化微信
 */
import {WX_CONFIG_URL, SHARE_DESC} from './constant'
import {rankContent} from './rank'
if (typeof wx != 'undefined') {
  $.getScript(WX_CONFIG_URL + "?random=" + Math.random(), function () {
    setWxConfig()
    wx.ready(function () {
      setShareContent(-1)
    });
    wx.error(function (msg) {
      console.log(msg)
    });
  });
}
function setWxConfig () {
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
  });
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
  if (typeof wx != 'undefined') {
    wx.onMenuShareTimeline(wx_data)
    wx.onMenuShareAppMessage(wx_data)
  }
}

/**
 * 获取分享内容
 */
export default function setShareContent (score, round) {
  var rank = rankContent(score)
  if (!rank) return

  rank.shareContent = rank.shareContent.replace(/(\{\w*\})/g, function () {
    if (arguments[0] === '{score}') return score
    if (arguments[0] === '{rank}') return rank.title
  })
  var title = rank.shareContent.replace(new RegExp('\n', 'g'), '，')
  console.log(title)
  setWxShare(title)
}
