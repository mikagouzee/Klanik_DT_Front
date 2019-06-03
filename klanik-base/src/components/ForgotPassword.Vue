<template>
    <div class="forgot-box">
        <div v-if="!mailSent" class="forgot-form">
            <label>Email :</label>
                <input v-model='email' type="email" placeholder="E-Mail"><br>
            <button @click="forgot">Send reset password mail</button>
        </div>

        <div v-if="mailSent" class="message-sent">
            A mail has been send to help you recover your password.
        </div>
    </div>
    
</template>

<script>
import authenticationService from '@/services/AuthenticationService';

export default {
    name:'forgot',
    components:{

    },
    data(){
        return {
            email:'',
            mailSent : false
        }
    },
    computed:{
        model(){
            return {
                email: this.email
            }
        }
    },
    mounted(){
        this.mailSent = false;
    },
    watch:{

    },
    methods:{
        forgot(){
            authenticationService.askNewPassword(this.email)
                .then(this.mailSent = true);
        }
    }

}
</script>

<style>
    forgot-box{
        padding:15px;
    }
</style>
