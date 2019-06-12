<template>
    <div class="admin-box">
        <section>
            <p>
                Cette section vous permet de nommer un recruteur en tant qu'administrateur de l'application.
            </p>

            <select v-if="users && users.length" v-model="selectedUser">
                <option v-for="user in recruiterList" :value="user" :key="user.id"> 
                    Recruiter {{user.firstName}}
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
        </section>



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
        recruiterList(){
            return this.users.filter(x => x.userType == 'recruiter');
        }

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
