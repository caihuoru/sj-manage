const mutations = {
    SET_STATE(state: any, info: any) {
        info = info || {}
        for (const i in info) {
            state[i] = info[i]
        }
    }
};

const actions = {
};

const getters = {
    appname:  (state: any) => {
        return state.appname || 'admin'
    },
    logo:  (state: any) => {
        return state.logo || 'assets/logo3.png'
    },
};

const state:any = {
};

const system: any = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default system;
