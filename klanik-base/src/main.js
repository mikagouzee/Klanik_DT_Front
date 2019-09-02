// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import store from "./store/store";

import BootstrapVue from "bootstrap-vue";
import "../node_modules/bootstrap/dist/css/Bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

import VueToastr from "@deveodk/vue-toastr";
import "@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

//DataTable.
import VueGoodTablePlugin from "vue-good-table";
// import the styles
import "vue-good-table/dist/vue-good-table.css";
//Wysiwyg
import CKEditor from "@ckeditor/ckeditor5-vue";
import StarRating from "vue-star-rating";
import VueResource from "vue-resource";

import VueInputMask from "vue-inputmask";
import KonsultantPlugin from "./plugins/api/Consultant.plugin";
import RecruteurPlugin from "./plugins/api/Recruteur.plugin";

Vue.use(VueMaterial);
Vue.use(VueToastr);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueGoodTablePlugin);
Vue.use(CKEditor);
Vue.use(VueInputMask.default);
Vue.use(KonsultantPlugin)
Vue.use(RecruteurPlugin);
Vue.config.productionTip = false;

/* eslint-disable no-new */
import Competences from '@/components/Admin/Competences'
import BusinessUnit from '@/components/Admin/BusinessUnit'
import Users from '@/components/Admin/Users';
import ConsultantCompetences from '@/components/Consultant/Competences'
import { VueGoodTable } from "vue-good-table";

Vue.component("vue-good-table", VueGoodTable)
Vue.component("star-rating", StarRating);
Vue.component("Competences",Competences);
Vue.component("Business-unit", BusinessUnit);
Vue.component("Users", Users);
Vue.component("consultant-competences",ConsultantCompetences)
new Vue({
  el: "#app",
  router,
  store,

  components: {
    App,
    VueGoodTable,
    Competences,
    BusinessUnit,
    Users,
    ConsultantCompetences
  },

  template: "<App/>"
});
