<template>
  <div class="admin-box">
    <b-tabs content-class="mt-3">
      <b-tab title="Users" active>
        <Users></Users>
      </b-tab>
      <b-tab title="Competences">
        <Competences from="Admin"></Competences>
      </b-tab>
      <b-tab title="Business units">
        <Business-unit></Business-unit>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";

export default {
  name: "administration",
  components: {  },
  data() {
    return {
      users: [],
      roles: [],
      selectedUser: {},
      selectedRole: ""
    };
  },
  async created() {
    // await this.getAllUsers();
    // await this.getAllRoles();
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
      authenticationService
        .setRoleToUser(this.selectedUser.id, this.selectedRole)
        .then(() => {
          this.$toastr("success", "Role updated", "");
        });
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
