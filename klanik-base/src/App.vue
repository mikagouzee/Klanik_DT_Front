<template>
<div id="app">
  <header>
    <b-navbar type="light" toggleable="lg">
      <b-navbar-brand to="/">Klanik</b-navbar-brand>
      <b-navbar-toggle target="nav-menu-collapse"></b-navbar-toggle>
      <b-collapse id="nav-menu-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link v-if="(isAdmin || isRecruteur)" :to="{name:'konsultants'}">Konsultants</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              v-if="isLogged && OptedIn && !HasProfile"
              :to="{name:'konsultantCreation'}"
            >Créer mon profil</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              v-if="(isAdmin || isRecruteur) && OptedIn"
              :to="{name:'administration'}"
            >Administration</router-link>
          </b-nav-item>
          <b-nav-item>
            <a v-if="isLogged && OptedIn && HasProfile" href="#" @click="details">Voir mon profil</a>
          </b-nav-item>
          <b-nav-item>
            <router-link v-if="isLogged" to="/gdpr">GDPR</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <b-button v-if="isLogged" variant="danger" @click="logOut">Log-out</b-button>
          <router-link v-if="!isLogged" :to="{name:'login'}">Log In</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </header>
  <body></body>
  <router-view />
</div>
</template>

<script>
import login from "./components/Login";

import authenticationService from "./services/AuthenticationService";

export default {
  name: "App",
  data() {
    return {
      currentUser: null
    };
  },
  computed: {
    isAdmin() {
      if (
        this.$store.getters.currentUser &&
        this.$store.getters.currentUser.role
      )
        return (
          this.$store.getters.currentUser.role.indexOf("Admin") > -1 ||
          this.$store.getters.currentUser.role.indexOf("SuperUser") > -1
        );
      else return false;
    },
    isRecruteur() {
      if (
        this.$store.getters.currentUser &&
        this.$store.getters.currentUser.role
      )
        return this.$store.getters.currentUser.role.indexOf("Recruteur") > -1;
    },
    isLogged() {
      return (
        this.$store.getters.currentUser != null &&
        Object.keys(this.$store.getters.currentUser).length
      );
    },
    OptedIn() {
      return this.$store.getters.GetOptIn;
    },
    HasProfile() {
      return this.$store.getters.isUserKonsultant;
    }
  },
  watch: {},
  components: {
    login: login
  },
  methods: {
    log() {
      console.log(JSON.stringify(this.$store.getters.currentUser, null, 4));
    },
    details() {
      if (this.$store.getters.currentUser != null)
        this.$router.push({
          name: "konsultantDetail",
          params: { konsultantId: this.$store.getters.currentUser.sub }
        });
    },
    logOut() {
      authenticationService.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
b-navbar router-link {
  padding: 5px;
}

b-nav-item {
  display: inline;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /* text-align: center; */
}

header {
  margin: 0;
  /* height: 56px; */
  padding: 0 16px 0 24px;
  background-color: #f8f9fa;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
