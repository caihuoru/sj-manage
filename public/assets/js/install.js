// 獲取設備信息
window.RPCDeviceInfo = function () {
  try {
    if (typeof sjapp !== 'undefined') {
      console.log('device info:', sjapp.GetSJId())
      return sjapp.GetSJId()
    } else {
      console.log('is not app')
    }
  } catch (e) {
    console.log(e)
  }
  return null
}

window.RPCExecute = function (cmd, data) {
  if (typeof window.SJJSCallCpp !== 'undefined') window.SJJSCallCpp(cmd, data)
}
