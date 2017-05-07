var url = 'http%3A%2F%2Fchannel.dev.pdmi.cn%2Fwechat%2Fwoauth%2Fcode'
var state = 'http://192.168.33.134:8080/wx.html'
var pdmi_appid = 'wx2986f41ab9c05538'
var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + pdmi_appid + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
var code = null
var userinfo = {}

window.onload = function () {
  code = getQueryString('code')
  if (code === null)
    window.location.href = path
  else {
    submit()
    // fetchUserInfo()
  }
}

function submit () {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/oauth/user?code=' + getQueryString('code'),
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      if (!data.nickname) {
        window.location.href = path
      } else {
        alert(JSON.stringify(data))
        fetchUserInfo()
        fetchScore()
        fetchRanking(10)
      }
    },
    error: function () {
      window.location.href = path
    }
  })
}

export function fetchUserInfo () {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/userInfo',
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      alert(JSON.stringify(data))
    }
  })
}
export function fetchScore (level, score) {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/' + level + '/' + score,
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      alert(JSON.stringify(data))
    }
  })
}
export function fetchRanking (size = 50) {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/ranking/' + size,
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      alert(JSON.stringify(data))
    }
  })
}
function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}