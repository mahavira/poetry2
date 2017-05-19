
export function fetchUserInfo (callback) {
  alert('fetch start:' + apiUrl + 'wechat/score/userInfo')
  $.ajax({
    url: apiUrl + 'wechat/score/userInfo',
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      // alert(JSON.stringify(data))
      console.log(data)
      alert(JSON.stringify(data))

      if (data && data.nickname) callback(data)
      else alert('fetch error fetchUserInfo')
    },
    error: function (data) {
      alert('error fetchUserInfo')
    }
  })
}

export function fetchScore (level, score, callback) {
  $.ajax({
    url: apiUrl + 'wechat/score/' + level + '/' + score,
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      alert(JSON.stringify(data))
      console.log(data)
    },
    error: function (data) {
      alert('error fetchScore')
    }
  })
}

export function fetchRanking (callback) {
  alert('fetch start:' + apiUrl + 'wechat/score/ranking/50')
  $.ajax({
    url: apiUrl + 'wechat/score/ranking/50',
    type: 'get',
    jsonp: 'callback',
    dataType: 'jsonp',
    success: function (data) {
      alert(JSON.stringify(data))
      console.log(data)
      if (data && data.ranking) callback(data)
      else alert('fetch error fetchRanking')
    },
    error: function (data) {
      alert('error fetchRanking')
    }
  })
}