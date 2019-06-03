<template>
    <div class="reset-box">
        <label>Password :</label>
            <input v-model='password' type="password" placeholder="Password">
        <label>Confirm password :</label>
            <input v-model='confirmPassword' type="password" placeholder="Confirm your password">

            <button @click="sendNewPassword">Send</button>
    </div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService';

export default {
    //todo : receive userId and confirmation code as props
    name:'resetPassword',
    components:{

    },
    data(){
        return {
            password : '',
            confirmPassword : ''
        }
    },
    beforeCreate(){
    },
    computed:{
        newPasswordModel(){
            return {
                newPassword:this.password,
                confirmPassword:this.confirmPassword,
                userId: this.$route.query.userid,
                code: this.$route.query.code
            };
        }
    },
    watch:{

    },
    methods:{
        async sendNewPassword(){
            //todo : implement;
            await authenticationService.resetPassword(this.newPasswordModel);
        }
    }
}
</script>

<style>

</style>
