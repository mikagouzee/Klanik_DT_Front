<template>
    <div class="registration">
        <div v-if="!isRegistered" class="box-registerForm">
            
                <label>Username :</label>
                    <input v-model='username' type="text" placeholder="UserName"><br>
                <label>First name :</label>
                    <input v-model='firstName' type="text" placeholder="First Name"><br>
                <label>Last name :</label>
                    <input v-model='lastName' type="text" placeholder="Last Name"><br>
                <label>Email :</label>
                    <input v-model='email' type="email" placeholder="E-Mail"><br>
                <label>Password :</label>
                    <input v-model='password' type="password" placeholder="Password">
                <label>Confirm password :</label>
                    <input v-model='confirmPassword' type="password" placeholder="Confirm your password">
                
                <span v-if="email.length && confirmPassword.length && !isPasswordCorrectlyConfirmed" style='color:red;'>Password incorrectly confirmed.</span><br>

                <br>

                <button @click="register">Register me</button>
        </div>

        <div v-if="isRegistered">
            We have send you a mail to confirm you address. Please check your inbox ;-)
        </div>

        <div v-if="errorMessage" class="error-message">
            {{errorMessage}}
        </div>

    </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";

export default {
    name:"register",
    components:{

    },
    data(){
        return{
            email:'',
            username:'',
            firstName:'',
            lastName:'',
            password:'',
            confirmPassword:'',

            isRegistered:false,
            errorMessage: ''
        }
    },
    computed:{
        registerModel(){
            return {
                username:this.username,
                firstName:this.firstName,
                lastName:this.lastName,
                email:this.email,
                password:this.password,
                confirmPassword:this.confirmPassword
            }
        },
        isPasswordCorrectlyConfirmed(){
            return this.password == this.confirmPassword;
        },
        loginModel(){
            return {
                username: this.registerModel.username,
                password: this.registerModel.password
            }
        }
    },
    watch:{
    },
    methods:{
            async register(){
                //console.log(JSON.stringify(this.registerModel, null, 4));

                await authenticationService.register(this.registerModel)
                    .then(
                        ok => {
                            //console.log("Registered!");
                            this.isRegistered = true;
                        },
                        ko => {
                            //console.log("Whoopsie... registering went wrong", ko);
                            this.errorMessage = ko;
                        }
                    );
        },
    }
}
</script>

<style>
.registration{
    padding:15px;
}

 .box-registerForm {
     padding:15px;
     display:grid;
     grid-template-columns: 15% 85%
 }

.box-registerForm label{
    grid-column: 1;
    grid-row:auto;
}

.box-registerForm input{
    grid-column:2;
    grid-row:auto;
    max-width:200px;
}

.box-registerForm button{
    grid-column:1;
    align-self:auto;
    justify-self: stretch;
}

</style>
