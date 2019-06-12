import {handleResponse} from '@/tools/handle-response';
import client from './AuthenticationKlient';

import store from '../store/store';

export default {
    
    
    //is user doesn't exist yet he will need to register
    async register(registerModel){
        console.log("Trying to register with", registerModel.username);

        return  await client().post('/api/Account', 
            registerModel,
            )
            .then(res => {
                // console.log(res);
                return res;
            });
    },

    //if he exists he needs to login. THIS SHOULD PROVIDE THE TOKEN. 
    async login(loginModel) {
        var jwt = await this.getToken(loginModel);

        var token = jwt.access_token;

        var myheaders = {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        };
        // console.log(myheaders);
        // console.log("Headers in auth service.login : ", myheaders);
        await this.connect(myheaders);
        
    },
  
    async connect(myheaders){
        console.log("Connecting...");
        return await client().post('/connect/userinfo', 
            {data:''},
            {headers:myheaders})
            .then(handleResponse)
            .then(res =>
                {
                    console.log("Connected!");
                    // console.log("User info :", res);
                    store.dispatch('LogIn', true);
                    store.dispatch('SetUser', res);
                });
    },

    logout() {
        // remove user from local storage to log user out
        console.log("Logging out");
        store.dispatch('LogIn', false);
        store.dispatch('SetUser',null);
        localStorage.removeItem('token');
    },

    async askNewPassword(email){
        console.log("Asking new password for account with email ", email);
        return await client().get(`api/Account/ForgotPassword?email=${email}`)
            .then(res =>{ 
                console.log("Ok : ",res);
            },err => { 
                console.log("Oups : ", err);
            });
    },

    async resetPassword(resetModel){
        return await client().post('/api/Account/SaveNewPassword',
            resetModel)
            .then(res => {return res});
    },

    async getToken(loginModel){
        var headers = {
            'Content-Type':'application/x-www-form-urlencoded'
        }

        return client().post('/connect/token', this.setFormData(loginModel), {headers:headers})
            .then(handleResponse)
            .then(resp => {
               localStorage.setItem('token',JSON.stringify(resp));
               return resp;
            });
    },

    setFormData(loginModel){
        //request needed for authentication

        const formData = new FormData();

        formData.set('grant_type', 'password');
        formData.set('client_id', 'ro.VueJs');
        formData.set('client_secret', 'klanik_front_app');
        formData.set('username', loginModel.username);
        formData.set('password', loginModel.password);
        formData.set('scope','openid profile api1');
        return formData;
    },

    async getAllUsers(){
        return await client().get('/api/account/users')
            .then(
                ok => { return ok },
                ko => {
                    console.log("Error in getting users : ", ko);
                }
            )
    },

    async getAllRoles(){
        return await client().get('/api/account/roles')
            .then(
                ok => { return ok },
                ko => {
                    console.log("Error in getting roles : ", ko);
                }
            )
    },

    async setRoleToUser(userId, selectedRole){
        return await client().post(`/api/account/SetRole/{userId}/{selectedRole}`)
            .then(
                ok => {console.log(ok); return ok},
                ko => {console.log(ok); })
    },
    async updateOptIn(id, optIn){
        console.log(`Will update ${id} with optIn : ${optIn}`);
        return await client().put('/api/Account/OptIn/', {id:id, optIn:optIn})
        .then(res=>console.log(res))
        .catch(err => console.log(err));
    }
  
}


