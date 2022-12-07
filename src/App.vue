<template>
  <a-config-provider :locale="locales">
    <div id="app"> 
      <router-view v-if="isRouteAlive" />

    </div>
  </a-config-provider>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import jaJP from "ant-design-vue/lib/locale-provider/ja_JP";
import { getBrowserInfo, getOsInfo } from "./utils/util";
import UtilSystem from '@/utils/tool/UtilSystem';
import ConfigUtil from '@/utils/tool/ConfigUtil';
import { notification } from "ant-design-vue";
import axios from "axios";
 
export default {
  data() {
    return {
      zhCN,
      zhTW,
      enUS,
      isRouteAlive: true,
      locales: zhTW,
      donghua: false
    };
  },
  provide() {
    return {
      reload: this.reload,
      setLang: this.setLang
    };
  },
  components: {
  },
  created() {

     // 加載站點默認配置
    let domain = location.host.split(":")[0]; // 讀取當前功能變數名稱獲取不同的配置項
    console.log("domain:",location.href);
    const isssl = location.href.indexOf("https") > -1 ;
    try {
      let filesContent = null;
      var filePath = "configs_" + domain + ".json" + "?" + Math.random() ;
      if(isssl){
         filePath = "configs_ssl_" + domain + ".json" + "?" + Math.random() ;
      }      
      filesContent = JSON.parse(this.readFile("sitesconfig/" + filePath));
      window.isLocalHost = false
      if (domain.indexOf('localhost') != -1 || domain.indexOf('192.168.1') != -1) {
        window.isLocalHost = true
      }
      window.siteConfigs = filesContent;
      document
        .getElementById("favicons")
        .setAttribute("href", filesContent.favicon);
      document.getElementById("titles").innerHTML = filesContent.appname;
      if (filesContent) {
        this.install(filesContent);
      }
    } catch (e) {
      console.log(e)
      alert(this.$t("Error reading site configuration!"));
    }

  },
  computed: {},
  mounted() {
    this.setLang();
    if (!this.checkTimer){
      this.checkTimer = setInterval(() => { this.checkSystem() }, 300000);
      this.checkSystem()
    }
  },
  methods: {
    readFile(filePath) {
      // 創建一個新的xhr對象
      let xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      const okStatus = document.location.protocol === "file" ? 0 : 200;
      xhr.open("GET", filePath, false);
      xhr.overrideMimeType("text/html;charset=utf-8");
      xhr.send(null);
      return xhr.status === okStatus ? xhr.responseText : null;
    },
    reload() {
      this.isRouteAlive = false;
      this.$nextTick(() => {
        this.isRouteAlive = true;
      });
    },
    setLang() {
      let lang = localStorage.getItem("AGLang");
      if (lang && lang.length > 0) {
        lang = lang.toLowerCase();
      } else {
        lang = "zh-tw";
      }
      switch (lang) {
        case "zh-tw":
          this.locales=zhTW;
          break;
        case "zh-cn":
          this.locales=zhCN;
          break;
        case "en-us":
          this.locales=enUS;
          break;

        case "ja-jp":
          this.locales=jaJP;
          break;
        default:
          this.locales=zhTW;
          break;
      }
    }, 
    install(config) {  
      // 設置平臺類型
      // let isTest = false;
      let device = "web"; // 設備名稱 ’我的iphone‘
      let browserInfo = getBrowserInfo(); // 瀏覽器資訊
      let osInfo = getOsInfo(); // 系統資訊 IPHONE 11
      let domain = window.location.host; // 功能變數名稱
      let ver = UtilSystem.VERSION
      let mac = '' 
      let udid = UtilSystem.getUdid()
       // 讀取系統配置
      let siteConfig = {};
      if (window.siteConfigs.ConfigSys != undefined) {
        siteConfig = window.siteConfigs; 
      } 
      // const config = {
      //   deviceName: device,
      //   os: osInfo,
      //   browser: browserInfo,
      //   domain: domain,
      //   version:ver,
      //   appid:'',
      //   udid:udid,
      // }
      if(config.Api){
          axios.defaults.baseURL = config.Api;
			}
    },     
    checkSystem() {
      try{
        // 檢測版本
        let err = ConfigUtil.checkVersion(UtilSystem.VERSION)
        const h = this.$createElement;
        if (err && err.length) {
            notification.open({
              message: '系統更新提示',
              class: "system-im-notification",
              duration: null,
              description: h("div", {
                domProps: {
                  innerHTML:err,
                },
              }),
              placement: "bottomRight",
            });
        }
      }catch(err){
        console.log('checkSystem',err)
      }
    }
  }
};
</script>

<style>
  #app {
    height: 100%;
  }
</style>
