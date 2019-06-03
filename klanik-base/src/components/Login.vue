<template>
    <div class="login-box">
        

        <div class="login" v-if="!loggedIn">
            <router-link :to="{name:'register'}">Register</router-link>
            <input v-model='username' type="text" placeholder="UserName">
            <input v-model='password' type="password" placeholder="Password">
            <button @click="login" >Login</button>
            <router-link :to="{name:'forgot'}">I forgot my password</router-link>
        </div>
        
        <div class="logout" v-if="loggedIn">
             <button @click="logout">Log out</button>
        </div>

    </div>

</template>


<script>
import authenticationService from "@/services/AuthenticationService";
import {authHeader} from '../tools/auth-header';



export default {
    name: "login",
    components:{
    },
    data(){
        return {
            username:'',
            password: '',
            returnUrl :'',
            error:'',
        }
    },
    created(){
        this.returnUrl = this.$route.query.returnUrl ||'/';
    },
    async mounted(){
        console.log("Mounting login.vue");
        var tokenBearer = authHeader(); //should be "bearer myEncryptedToken"

        if(tokenBearer!= undefined){
            var myHeader = {
                    'Content-Type':'application/json',
                    'Authorization':tokenBearer
            }

            //console.log("Header : ", myHeader);
            
            await authenticationService.connect(myHeader)
                .then(user => {
                    this.$router.push(this.returnUrl);
                });  
        }
    },
    computed:{
        loginModel(){
            return {
                username : this.username,
                password : this.password
            };
        },
        loggedIn(){
            return this.$store.getters.isLogged;
        },
       
    },
    methods:{
        async login(){
            await authenticationService.login(this.loginModel)
                .then(
                    user =>{
                        this.$router.push(this.returnUrl);
                    } ,
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        },
        logout(){
            authenticationService.logout();
            this.$router.push('/login');
        }
    },
    watch:{

    }
}
</script>

<style>
    .box{
        display:inline;
    }

    .login input{
        max-width:100px;
    }

</style>

