<template>
  <div id="app">
      <header>
      <b-navbar type="light" variant="light" >
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">Klanik</b-navbar-brand>
        <router-link v-if="isAdmin" :to="{name:'konsultants'}">Konsultants</router-link> | 
        <router-link v-if="isLogged && OptedIn" :to="{name:'konsultantCreation'}">Créer mon profil</router-link> |
        <router-link v-if="isAdmin && OptedIn" :to="{name:'administration'}">Administration</router-link> | 
        <!-- <button  v-if="isLogged" @click="details">See your profile</button> -->
        <a v-if="isLogged && OptedIn" href="#" @click="details" >Voir mon profil</a>
        <!-- <router-link v-if="isLogged" :to="{name:'konsultantDetail', params:{konsultantId:currentUser.sub}}">Voir votre profil</router-link> | -->
        
        <!-- <button @click="log">Log Current User</button> -->

        <b-navbar-nav class="ml-auto">
          <b-nav-item right> <login></login> </b-nav-item>
        </b-navbar-nav>


      </b-navbar>
    </header>
    
   
    <router-view/>
  </div>
</template>

<script>
import login from './components/Login';

import authenticationService from './services/AuthenticationService';

export default {
  name: 'App',
  data(){
    return{
      currentUser: null,
    };
  },
  computed:{
    isAdmin(){
      if(this.$store.getters.currentUser != null)
        return this.$store.getters.currentUser.role == 'Admin' || this.$store.getters.currentUser.role == 'SuperUser';
      else  
        return false;
    },
    isLogged(){
      return this.$store.getters.currentUser != null && Object.keys(this.$store.getters.currentUser).length;
    },
    OptedIn(){
      return this.$store.getters.GetOptIn;
    }
   
  },
  watch:{
  },
  components:{
    login: login
  },
  methods:{
    log(){
      console.log(JSON.stringify(this.$store.getters.currentUser, null,4));
    },
    details(){
      if(this.$store.getters.currentUser != null)
        this.$router.push({name:'konsultantDetail', params:{konsultantId:this.$store.getters.currentUser.sub}})
    }
  },
}
</script>

<style>
b-navbar router-link{
  padding:5px;
}

b-nav-item{
  display:inline;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

</style>
