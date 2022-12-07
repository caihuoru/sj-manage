
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUs from '@/locales/en-US.json'
import zhCn from '@/locales/zh-CN.json'
import zhTw from '@/locales/zh-TW.json'
import jaJp from '@/locales/ja-JP.json'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import zhTW from 'vxe-table/lib/locale/lang/zh-TW'
import enUS from 'vxe-table/lib/locale/lang/en-US'
Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh-tw',
  fallbackLocale: 'zh-tw',
  messages: {
    'en-us': { ...enUS, ...enUs },
    'zh-tw': { ...zhTW, ...zhTw },
    'zh-cn': { ...zhCN, ...zhCn },
    'ja-jp': { ...jaJp }
  }
})
