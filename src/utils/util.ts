export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event:any = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = null;

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

// 獲取設備資訊
export function getOsInfo() {
  try{
    var sUserAgent = navigator.userAgent
    var isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows'
    var isMac =
      navigator.platform == 'Mac68K' ||
      navigator.platform == 'MacPPC' ||
      navigator.platform == 'Macintosh' ||
      navigator.platform == 'MacIntel'
    if (isMac) return 'Mac'
    var isUnix = navigator.platform == 'X11' && !isWin && !isMac
    if (isUnix) return 'Unix'
    var isLinux = String(navigator.platform).indexOf('Linux') > -1
    if (isLinux) return 'Linux'
    if (isWin) {
      var isWin2K =
        sUserAgent.indexOf('Windows NT 5.0') > -1 ||
        sUserAgent.indexOf('Windows 2000') > -1
      if (isWin2K) return 'Win2000'
      var isWinXP =
        sUserAgent.indexOf('Windows NT 5.1') > -1 ||
        sUserAgent.indexOf('Windows XP') > -1
      if (isWinXP) return 'WinXP'
      var isWin2003 =
        sUserAgent.indexOf('Windows NT 5.2') > -1 ||
        sUserAgent.indexOf('Windows 2003') > -1
      if (isWin2003) return 'Win2003'
      var isWinVista =
        sUserAgent.indexOf('Windows NT 6.0') > -1 ||
        sUserAgent.indexOf('Windows Vista') > -1
      if (isWinVista) return 'WinVista'
      var isWin7 =
        sUserAgent.indexOf('Windows NT 6.1') > -1 ||
        sUserAgent.indexOf('Windows 7') > -1
      if (isWin7) return 'Win7'
      var isWin8 =
        sUserAgent.indexOf('Windows NT 8') > -1 ||
        sUserAgent.indexOf('Windows 8') > -1
      if (isWin8) return 'Win8'
      var isWin10 =
        sUserAgent.indexOf('Windows NT 10') > -1 ||
        sUserAgent.indexOf('Windows 10') > -1
      if (isWin10) return 'Win10'
      return 'Win ??'
    }
  }catch(err){
  } 
  return 'other'
}
// 獲取流覽器資訊
export function getBrowserInfo() {
  try{
    var explorer = window.navigator.userAgent.toLowerCase()
    // ie
    if (explorer.indexOf('msie') >= 0) {
      var ver = explorer.match(/msie ([\d.]+)/)[1]
      return 'IE ' + ver
    } else if (explorer.match(/trident\/.*rv:11/)) {
      return 'IE 11'
    }
    // firefox
    else if (explorer.indexOf('firefox') >= 0) {
      var ver = explorer.match(/firefox\/([\d.]+)/)[1]
      return 'firefox ' + ver
    }
    // Chrome
    else if (explorer.indexOf('chrome') >= 0) {
      var ver = explorer.match(/chrome\/([\d.]+)/)[1]
      return 'chrome ' + ver
    }
    // Opera
    else if (explorer.indexOf('opera') >= 0) {
      var ver = explorer.match(/opera.([\d.]+)/)[1]
      return 'opera ' + ver
    }
    // Safari
    else if (explorer.indexOf('safari') >= 0) {
      var ver = explorer.match(/version\/([\d.]+)/)[1]
      return 'safari' + ver
    }
  }catch(err){
  }
  return 'unknow'
}

// 加密
export function encodepwd(data) {
  // let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // let encode = AES.EncryptBase64("pwd0123456789**" + data, key);
  data = 'pwd159357**' + data
  let encode = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key]
      encode += String.fromCodePoint(element.charCodeAt() + 2)
    }
  }
  return encode
}

// 解密
export function decodepwd(data) {
  // let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // let decode = AES.DecryptBase64(data, key);
  // let arr = decode.split("**");
  // if (arr[0] == "pwd0123456789") {
  //   return arr[1];
  // }
  let decode = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key]
      decode += String.fromCodePoint(element.charCodeAt() - 2)
    }
  }
  const arr = decode.split('**')
  if (arr[0] == 'pwd159357') {
    return arr[1]
  }
  return data
}