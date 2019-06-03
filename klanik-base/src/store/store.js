import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({

    state:{
        loggedIn:false,
        currentUser:{},
        selectedKonsultant:{},
    },
    mutations:{
        LOG_IN(state,isLog){
            state.loggedIn = isLog;
        },
        SET_USER(state, user){
            state.currentUser = user;
        },
        SELECT_KONSULTANT(state, konsultant){
            state.selectedKonsultant = konsultant;
        },

    },
    actions:{
        LogIn(context, isLog){
            context.commit('LOG_IN', isLog);
        },
        SetUser(context, user){
            context.commit('SET_USER',user);
        },
        SelectKonsultant(context, konsultant){
            context.commit('SELECT_KONSULTANT', konsultant);
        },
    },
    getters:{
        isLogged(state){
            return state.loggedIn;
        },
        currentUser(state){
            return state.currentUser;
        },
        selectedKonsultant(state){
            return state.selectedKonsultant;
        },
    },
    

});