// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store/store';

import BootstrapVue from 'bootstrap-vue';
import '../node_modules/bootstrap/dist/css/Bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';



Vue.config.productionTip = false

Vue.use(BootstrapVue);

import VueResource from 'vue-resource'
Vue.use(VueResource)
//DataTable.
import VueGoodTablePlugin from 'vue-good-table';
// import the styles 
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App
   },
  template: '<App/>'
})
