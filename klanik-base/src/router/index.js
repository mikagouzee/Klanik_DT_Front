import Vue from "vue";
import Router from "vue-router";
import { Role } from "../tools/Roles";
import Login from "../components/Login";
import Resetpassword from "../components/ResetPassword";
import Forgot from "../components/ForgotPassword";

import Home from "../components/Home";
import KonsultantList from "../components/KonsultantList";
import KonsultantDetail from "../components/KonsultantDetail";
import KonsultantCreation from "../components/KonsultantCreation";
import KonsultantEdition from "../components/KonsultantEdition";
import Register from "../components/Register";
import Administration from "../components/Administration";
import GDPR from "../components/gdpr";

import store from "../store/store";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { authorize: [] }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/forgot",
      name: "forgot",
      component: Forgot
    },
    {
      path: "/konsultants",
      name: "konsultants",
      component: KonsultantList,
      meta: { authorize: [Role.Admin] }
    },
    {
      path: "/konsultant/new",
      name: "konsultantCreation",
      component: KonsultantCreation,
      meta: { authorize: [Role.User, Role.Admin] }
    },
    {
      path: "/konsultant/edit/:konsultantId",
      name: "konsultantEdition",
      component: KonsultantEdition,
      meta: { authorize: [Role.User, Role.Admin] }
    },
    {
      path: "/konsultant/:konsultantId",
      name: "konsultantDetail",
      component: KonsultantDetail,
      meta: { authorize: [Role.User, Role.Admin] }
    },
    {
      path: "/reset",
      name: "resetPassword",
      component: Resetpassword
    },
    {
      path: "/admin",
      name: "administration",
      component: Administration
    },
    {
      path:"/gdpr",
      name:"GDPR",
      component : GDPR
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  //console.log("trying to get to", to.path);
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  const { authorize } = to.meta;
  var currentuser = store.getters.isLogged;
  //console.log("Routers think user is Authenticated : ",currentuser);

  if (authorize) {
    //console.log("Authorization required to access",to.name);

    if (!currentuser) {
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    // if(authorize.length && !authorize.includes(currentuser.role)){
    //     return next({path:'/'});
    // }
  }

  next();
});
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
