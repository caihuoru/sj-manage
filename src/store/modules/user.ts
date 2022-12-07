import Vue from 'vue';
import {login, logout} from '@/api/login';
import {ACCESS_TOKEN} from '@/store/mutation-types';
import {MutationTree, ActionTree, GetterTree, ActionContext, Module} from 'vuex';
import {RootState} from '@/store/interface';
const v= Vue as any;

export interface IUserState {
    token: string,
    info: any,
}

const mutations:MutationTree<IUserState> = {
    SET_TOKEN: (state: IUserState, token) => {
        state.token = token;
    },
    SET_INFO: (state: IUserState, info) => {
        state.info = info;
    },
};

const actions:ActionTree<IUserState,RootState> = {
    Login(context:ActionContext<IUserState,RootState>,userInfo){
        return new Promise((resolve, reject) => {
            login(userInfo).then(res => {
                const response:any=res;
                const result = response.data;
                v.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);               
                context.commit('SET_TOKEN', result.token);
                context.commit('SET_INFO', result.user);
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    },
    GetInfo(context){
        // return new Promise((resolve, reject) => {
        //     getInfo().then(res => {
        //       const response:any=res;
        //         const result = response.result;

        //         if (result.role && result.role.permissions.length > 0) {
        //             const role = result.role;
        //             role.permissions = result.role.permissions;
        //             role.permissions.map(per => {
        //                 if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //                     const action = per.actionEntitySet.map(action => {
        //                         return action.action;
        //                     });
        //                     per.actionList = action;
        //                 }
        //             });
        //             role.permissionList = role.permissions.map(permission => {
        //                 return permission.permissionId;
        //             });
        //             context.commit('SET_ROLES', result.role);
        //             context.commit('SET_INFO', result);
        //         } else {
        //             reject(new Error('getInfo: roles must be a non-null array !'));
        //         }

        //         context.commit('SET_NAME', {name: result.name, welcome: welcome()});
        //         context.commit('SET_AVATAR', result.avatar);

        //         resolve(response);
        //     }).catch(error => {
        //         reject(error);
        //     });
        // });
    },
    Logout(context){
        return new Promise((resolve) => {
            context.commit('SET_TOKEN', '');
            context.commit('SET_INFO', {});
            v.ls.remove(ACCESS_TOKEN);

            logout().then(() => {
                resolve('');
            }).catch(() => {
                resolve('');
            });
        });
    }
};


const getters: GetterTree<IUserState, RootState> = {
    // token: (state: IUserState) => {
    //     return state.token
    // }
    info:  (state: any) => {
        return state.info
    },
};

const userState: IUserState = {
    token: '',
    info: {}
};

const user: Module<IUserState, RootState> = {
    namespaced: true,
    state: userState,
    getters: getters,
    actions: actions,
    mutations: mutations,
};

export default user;
