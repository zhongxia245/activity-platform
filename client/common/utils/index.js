export const isDev = () => {
  if (
    window.location.href.indexOf('localhost') !== -1 ||
    window.location.href.indexOf('127.0.0.1') !== -1 ||
    window.location.href.indexOf('192.168') !== -1
  ) {
    return true
  }
  return false
}

export const queryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)

  if (r != null) {
    return decodeURI(r[2])
  }
  return ''
}
