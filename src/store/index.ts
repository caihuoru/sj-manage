import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import { RootState } from './interface';

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    app,
    user,
    permission
  },
  getters:getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    key: 'system',
    reducer(val:any){
        return {
            app: val.app,
            user: val.user,
            permission: val.permission,
        }
    }
})]
})
