  <!-- <template>
<b-form inline>
  <div class="login-box ">
 
        <div class="login" v-if="!loggedIn">
            <router-link class="mr-sm-2" :to="{name:'register'}">Register</router-link>
            <input   class="mb-2 mr-sm-2 mb-sm-0" v-model='username' type="text" placeholder="UserName">
            <input   class="mb-2 mr-sm-2 mb-sm-0" v-model='username' type="text" placeholder="UserName">
            <b-button variant="primary"   class="mb-2 mr-sm-2 mb-sm-0" @click="login" >Login</b-button>
            <router-link   class="mb-2 mr-sm-2 mb-sm-0" :to="{name:'forgot'}">I forgot my password</router-link>
        </div>
        <div class="logout" v-if="loggedIn">
             <b-button variant="primary" @click="logout">Log out</b-button>
        </div>
  </div>
  </b-form>
</template>-->
<template >
  <!-- Default form login -->
  <div class="ctnair">
    <div>&nbsp;</div>
    <div>
      <p class="h4 text-center mb-4">Sign in</p>
      <label for="defaultFormLoginEmailEx" class="grey-text">Your username</label>
      <input class="form-control" v-model="username" type="text" placeholder="UserName" />
      <br />
      <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
      <input class="form-control" v-model="password" type="password" placeholder="Password" />
      <div class="text-center mt-4">
        <router-link class="mr-sm-2" :to="{name:'register'}">Register</router-link>
        <button class="btn btn-indigo" @click="login">Login</button>
      </div>
    </div>
    <div>&nbsp;</div>
  </div>
  <!-- Default form login -->
</template>

<script>
import authenticationService from "@/services/AuthenticationService";
import { authHeader } from "../tools/auth-header";

export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      returnUrl: "",
      error: ""
    };
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  async mounted() {
    var tokenBearer = authHeader(); //should be "bearer myEncryptedToken"

    if (tokenBearer != undefined) {
      var myHeader = {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      };

      await authenticationService.connect(myHeader).then(
        user => {
          this.$router.push(this.returnUrl);
        },
        err => {
          this.$toastr("error", err, "hello");
        }
      );
    }
  },
  computed: {
    loginModel() {
      return {
        username: this.username,
        password: this.password
      };
    },
    loggedIn() {
      return this.$store.getters.isLogged;
    }
  },
  methods: {
    async login() {
      console.log("Ok");
      await authenticationService.login(this.loginModel).then(
        user => {
          this.$router.push(this.returnUrl);
        },
        error => {
          this.$toastr("error", error, "hello");
          this.error = error;
          this.loading = false;
        }
      );
    },
    logout() {
      authenticationService.logout();
      this.$router.push("/login");
    }
  },
  watch: {}
};
</script>

<style>
.ctnair {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
/* .box {
  display: inline;
}

.login input {
  max-width: 100px;
} */
</style>

