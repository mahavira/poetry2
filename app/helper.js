export function baseRandom (lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1))
}
// export function keyBy (collection, k) {
//   var data = {}
//   $.each(collection, function (i, n) {
//     if (!data[n[k]]) data[n[k]] = []
//     data[n[k]].push(n)
//   })
//   return data
// }
export function shuffle (arr) {
  var _floor = Math.floor
  var _random = Math.random
  var len = arr.length
  var i
  var j
  var arri
  var n = _floor(len / 2) + 1
  while (n--) {
    i = _floor(_random() * len)
    j = _floor(_random() * len)
    if (i !== j) {
      arri = arr[i]
      arr[i] = arr[j]
      arr[j] = arri
    }
  }
  return arr
}
// 动态加载css文件
export function loadStyles (url) {
  var link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  document.getElementsByTagName('head')[0].appendChild(link)
}
