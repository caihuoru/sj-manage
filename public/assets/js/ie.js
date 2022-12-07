var WebInit = (function () {
  var googleAlisy = {
    r935: {
      url: 'https://www.googletagmanager.com/gtag/js?id=UA-175687553-2',
      gtag: 'UA-175687553-2'
    },
    f935: {
      url: 'https://www.googletagmanager.com/gtag/js?id=UA-175687553-1',
      gtag: 'UA-175687553-1'
    }
  }

  var getExploreName = function () {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      return 'Opera'
    } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
      return 'IE'
    } else if (userAgent.indexOf('Edge') > -1) {
      return 'Edge'
    } else if (userAgent.indexOf('Firefox') > -1) {
      return 'Firefox'
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1) {
      return 'Safari'
    } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
      return 'Chrome'
    } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return 'IE>=11'
    } else {
      return 'Unkonwn'
    }
  }

  var loadscript = function (opt) {
    var scriptFile = document.createElement('script')

    scriptFile.src = opt.url
    setTimeout(() => {
      document.body.appendChild(scriptFile)
      scriptFile.onload = () => {
        window.dataLayer = window.dataLayer || []

        function gtag () {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', opt.gtag)
      }
    }, 3000)
  }

  var searchDomain = function (key, obj) {
    var arr = Object.keys(obj)
    return arr.filter((item) => item === key)
  }

  return {
    init () {
      var _browser = getExploreName()
      if (_browser === 'IE' || _browser === 'IE>=11') {
        window.location = 'ie.html'
      } else {
        var host = window.location.host
        var reg = /\.(.+?)\./ig
        var domain = host.match(reg)
        if (domain && domain.length > 0) {
          try {
            domain = domain[0].replace('.', '').replace('.', '')
            var currentDomain = searchDomain(domain, googleAlisy)
            loadscript(googleAlisy[currentDomain])
          } catch (error) {
            console.warn(error, domain)
          }
        } else {
          console.log('currentDomain:', 1)
        }
      }
    }
  }
}());

// WebInit().setGoogle();
// loadscript('https://www.googletagmanager.com/gtag/js?id=UA-175687553-1', googleGTAG);

(function () {
  WebInit.init()
})(window)
