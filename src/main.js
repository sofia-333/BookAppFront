import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import store from "@/store";
import uuid from '@estudioliver/vue-uuid-v4'
import router from "@/router";

Vue.use(uuid)
Vue.use(VueToast)
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
