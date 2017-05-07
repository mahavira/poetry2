export const Cookie = {
  getCookie: function (e) {
    for (var t = e + "=", a = document.cookie.split(";"), n = 0; n < a.length; n++) {
      for (var i = a[n]; " " == i.charAt(0);)
        i = i.substring(1);
      if (i.indexOf(t) != -1)
        return i.substring(t.length, i.length)
    }
    return ""
  },
  setCookie: function (e, t, a) {
    var n = new Date;
    n.setTime(n.getTime() + 24 * a * 60 * 60 * 1e3);
    var i = "expires=" + n.toUTCString();
    document.cookie = e + "=" + t + "; " + i
  }
}
