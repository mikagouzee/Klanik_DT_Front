import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    currentUser: {},
    selectedKonsultant: {}
  },
  mutations: {
    LOG_IN(state, isLog) {
      state.loggedIn = isLog;
    },
    SET_USER(state, user) {
      state.currentUser = user;
    },
    SELECT_KONSULTANT(state, konsultant) {
      state.selectedKonsultant = konsultant;
    },
    SET_OPTIN(state, optIn) {
      state.currentUser.OptIn = optIn;
    }
  },
  actions: {
    LogIn(context, isLog) {
      context.commit("LOG_IN", isLog);
    },
    SetUser(context, user) {
      context.commit("SET_USER", user);
    },
    SelectKonsultant(context, konsultant) {
      context.commit("SELECT_KONSULTANT", konsultant);
    },
    SetOptIn(context, optIn) {
      context.commit("SET_OPTIN", optIn);
    }
  },
  getters: {
    isLogged(state) {
      return state.loggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    selectedKonsultant(state) {
      return state.selectedKonsultant;
    },
    GetOptIn(state) {
        //Fuck it  V_V
       if(typeof(state.currentUser.OptIn) === typeof(String) && state.currentUser.OptIn == "False")
       {
           return false;
       }
      return state.currentUser.OptIn;
    }
  }
});
