import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    user: {},
    token: null,
};

const actions = {
    setToken({commit}, token = null) {
        commit('setToken', token);
    },
    setUser({commit}, user = null) {
        commit('setUser', user);
    },
    logoutUser({commit}, user = null) {
        commit('logoutUser', user);
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUser: (state, user) => {
        state.user = user;
    },
    logoutUser: (state) => {
        state.user = null;
        state.token = null;
    }
};


export default {
    state,
    actions,
    mutations
}
