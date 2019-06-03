<template>
    <div class="admin-box">
        <select v-if="users && users.length" v-model="selectedUser">
            <option v-for="user in users" :value="user" :key="user.id"> 
                {{user.firstName}}
            </option>
        </select>

         <select v-if="roles && roles.length" v-model="selectedRole">
            <option v-for="(role, index) in roles" :value="role" :key="index"> 
                {{role}}
            </option>
        </select>
        
        <button @click="setRoleToUser" >
            Set role
        </button>



    </div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService';

export default {
    name:'administration',
    components:{

    },
    data(){
        return {
            users:[],
            roles:[],
            selectedUser:{},
            selectedRole:''
        }
    },
    async created(){
        await this.getAllUsers();
        await this.getAllRoles();
    },
    computed:{

    },
    watch:{
        users(){
            this.selectedUser = this.users[0];
        },
        roles(){
            this.selectedRole = this.roles[0];
        }
    },
    methods:{
        async getAllUsers(){
            return await authenticationService.getAllUsers()
                .then(res => {
                    //console.log("users :",res);
                    this.users = res.data;
                    }
                );
        },

        async getAllRoles(){
            return await authenticationService.getAllRoles()
                .then(res => {
                    //console.log("Roles ",res);
                    this.roles = res.data;
                    }
                );
        },

        async setRoleToUser(){
            //console.log("Setting role", this.selectedRole, " to user", this.selectedUser.firstName);
            return await authenticationService.setRoleToUser(selectedUser.userId, selectedRole);
        }
    }
}
</script>

<style>
    .admin-box{
        margin: 20px;
    }
</style>
