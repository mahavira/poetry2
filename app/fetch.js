
export function fetchUserInfo (callback) {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/userInfo',
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      // alert(JSON.stringify(data))
      console.log(data)
      callback(data)
    }
  })
}

export function fetchScore (level, score, callback) {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/' + level + '/' + score,
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      // alert(JSON.stringify(data))
      console.log(data)
      callback(data)
    }
  })
}

export function fetchRanking (callback) {
  $.ajax({
    url: 'http://channel.dev.pdmi.cn/wechat/score/ranking/50',
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      // alert(JSON.stringify(data))
      console.log(data)
      callback(data)
    }
  })
}