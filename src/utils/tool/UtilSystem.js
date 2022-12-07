/** 系統配置信息 */
class VOSysConfig {
  constructor () {
    this.onlineMax=0
    this.onlineTodayMax=0
    this.openClientAppOpenTip=0
    this.openManageAppOpenTip=0 // 管理端開機提示
    this.minCLoginVer=0
    this.minMLoginVer=0
    this.clone = function(object){
      for (const key in object) {
        if (this.hasOwnProperty(key)) {
          const element = object[key];
          this[key] = element
        }
      }
    }
  } 
}
/** 系統初始化，版本檢測 */
export default class UtilSystem {
  // 獲取系統配置
  static getSystemConfig(stcore) {
    UtilSystem.Core = stcore
    return new Promise(function(resolve,reject){
      stcore.Request("/data/sysconfig").then(
        result => {
          UtilSystem.SysConfig.clone(result)
          resolve(result)
        },
        error => {
          reject(error)
        }
      )
    })
  }
  static postLocalStorage(uid,value){
    if (UtilSystem.Core == null) return
    try{      
      let jstest = JSON.stringify(value)
      UtilSystem.Core.Request('/data/savelocal',{uid:uid,value:jstest}).then(
        result=>{
          console.log('post local_storage result:',result)
        },
        error => {
          console.log('save local_storage err:',error)
        }
      )
    }catch(err){
      console.log('json is error:',err)
      return
    }
  }
   /** 獲取設備唯一碼 */
  static getUdid() {
    let _udid = localStorage.getItem("JQADM_UDID");
    if (_udid) return _udid;
    const date = new Date();
    const random = parseInt(Math.random() * 100000);
    _udid += "web_" + (date.getTime() + "_" + random);
    while (_udid.length < 32) {
      _udid = _udid + "_" + _udid;
    }
    const encodeUdid = Buffer.from(_udid).toString("base64");
    localStorage.setItem("JQADM_UDID", encodeUdid);
    return encodeUdid;
  }

}
UtilSystem.ProductPassword = '' //商品管理的緩存密碼
UtilSystem.Core = null
UtilSystem.SysConfig = new VOSysConfig()
UtilSystem.isShowedBySystip = false;
UtilSystem.APP_NAME = "后臺管理系統";
UtilSystem.VERSION = "1.0.0";

UtilSystem.IsShowSelectTradingType = false; //是否顯示交易類型
UtilSystem.PRODUCT_UINT_POINT = "50,100,200" // 大，中，小臺設置

UtilSystem.isTester = function (username) {
  var testUsers = ['D11','D12','Z1','Z2','D168','Z3','Z5']
  username = username.toUpperCase()
  return testUsers.indexOf(username) !== -1
}

UtilSystem.ExchangeArea = [
  {code:"CN",  des:"中國"},
  {code:"TW",  des:"臺灣"},
  {code:"HK",  des:"香港"},
  {code:"SG",  des:"新加坡"},
  {code:"EUR", des:"歐洲"},
  {code:"JPN", des:"日本"},
  {code:"US",  des:"美國"}
]


