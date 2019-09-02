
<template >
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
        <router-link class="mb-2 mr-sm-2 mb-sm-0" :to="{name:'forgot'}">I forgot my password</router-link>
      </div>
    </div>
    <div>&nbsp;</div>
  </div>
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
    var tokenBearer = authHeader();
    if (tokenBearer != undefined) {
      var myHeader = {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      };
      if (tokenBearer) {
        await authenticationService.connect(myHeader).then(
          user => {
            this.$router.push(this.returnUrl);
          },
          err => {
            //If the tokens exist but the status is 401 (Unauthorized) don't display 
            //the err message.
            if(err.response.status != 401)
              this.$toastr("error", err, "hello");
          }
        );
      }
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

<style >
.ctnair {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>

