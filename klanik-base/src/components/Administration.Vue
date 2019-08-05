<template>
  <div class="admin-box">
    <p>Cette section vous permet de nommer un recruteur en tant qu'administrateur de l'application.</p>
    <section class="content">
      <multiselect track-by="id" label="fullName" v-model="selectedUser" :options="users"></multiselect>
      <multiselect v-model="selectedRole" :options="roles"></multiselect>
      <md-button class="buttonAdd md-raised" @click="setRoleToUser">Set role</md-button>
    </section>
  </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";
import Multiselect from "vue-multiselect";
export default {
  name: "administration",
  components: {  Multiselect },
  data() {
    return {
      users: [],
      roles: [],
      selectedUser: {},
      selectedRole: ""
    };
  },
  async created() {
    await this.getAllUsers();
    await this.getAllRoles();
  },
  computed: {
    recruiterList() {
      return this.users.filter(x => x.userType == "recruiter");
    }
  },
  watch: {
    users() {
      this.selectedUser = this.users[0];
    },
    roles() {
      this.selectedRole = this.roles[0];
    }
  },
  methods: {
    async getAllUsers() {
      return await authenticationService.getAllUsers().then(res => {
        this.users = res.data;
      });
    },

    async getAllRoles() {
      return await authenticationService.getAllRoles().then(res => {
        this.roles = res.data;
      });
    },

    async setRoleToUser() {
      authenticationService.setRoleToUser(
        this.selectedUser.id,
        this.selectedRole
      ).then(()=>{this.$toastr('success', 'Role updated', '')});
    }
  }
};
</script>

<style>
.admin-box {
  margin: 20px;
}
.searchbox {
  grid-area: sr;
}
.searchbox2 {
  grid-area: sr2;
}
.buttonAdd {
  grid-area: bt;
}
.content {
  display: grid;
  grid-template-columns: (7, 1fr);
  grid-template-areas: "sr sr sr2 sr2 . . bt";
}
</style>
