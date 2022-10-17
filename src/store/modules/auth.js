Vue.use(Vuex)
const state = {
    token: null,
};

const actions = {
    setToken({commit}, token = null) {
        commit('setToken', token);
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    }
};


export default {
    state,
    actions,
    mutations
}
