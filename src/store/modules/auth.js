import Vue from 'vue'
import Vuex from 'vuex'
import mainService from "@/utils/service";

Vue.use(Vuex)
const state = {
    user: {},
    token: null,
};

const actions = {
    setToken({commit}, token = null) {
        commit('setToken', token);
    },
    setUser({commit}, user ) {
        commit('setUser', user);
    },
    async logoutUser({commit},) {
        await mainService.logout()
        commit('logoutUser');
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
        localStorage.token = token;
    },
    setUser: (state, user) => {
        state.user = user;
        localStorage.userDisplayName = `${user.first_name} ${user.last_name}`;
    },
    logoutUser: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userDisplayName');
    }
};


export default {
    state,
    actions,
    mutations
}
