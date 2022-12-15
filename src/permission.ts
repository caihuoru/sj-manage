import Vue from 'vue'
import router from './router'
import store from './store'

// import 'nprogress/nprogress.css' // progress bar style
// import notification from 'ant-design-vue/es/notification'
// import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import { ACCESS_TOKEN } from '@/store/mutation-types'



const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to: any, from: any, next) => {

  if (whiteList.includes(to.name)) {
      next()
  } else {
    if ((store as any).state.user.token) {
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (redirect && redirect.indexOf('login') == -1) {
        next()
      } else {
        next({ path: redirect })
      }
      
    } else {
      console.log(1)
      next({ path: '/account/login', query: { redirect: to.fullPath } })
    }
  }
})

router.afterEach(() => {
})


