<template>
  <div>
    <p>Cette section vous permet de nommer un recruteur en tant qu'administrateur de l'application.</p>
    <div class="content">
      <multiselect track-by="id" label="fullName" v-model="selectedUser" :options="users"></multiselect>
      <multiselect v-model="selectedRole" :options="roles"></multiselect>
      <md-button class="buttonAdd md-raised" @click="setRoleToUser">Set role</md-button>
    </div>
    <div class="tables">
      <vue-good-table
        ref="AllK"
        :columns="columns"
        :rows="users"
        :isLoading="loadingUser"
        :selectOptions="{
            enabled:true,
            selectOnCheckboxOnly:true
            }"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search for a user'}"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 10,
          nextLabel: 'next',
          prevLabel: 'prev',
          rowsPerPageLabel: 'Rows per page',
          ofLabel: 'of',
          pageLabel: 'page', // for 'pages' mode
          allLabel: 'All'}"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <md-button class="md-icon-button" @click="deleteConsltant(props)">
              <md-icon>highlight_off</md-icon>
            </md-button>
          </span>
          <span v-else-if="props.column.field=='roles'">{{props.row.roles.join(',')}}</span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
        <template slot="loadingContent" class="loadingContent">
          <span></span>
          <div class="loader"></div>
          <span></span>
        </template>
      </vue-good-table>
    </div>
    <b-modal
      size="xl"
      id="deleteModal"
      :cancel-disabled="true"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      :scrollable="true"
    >
      {{this.toDelete.firstName}} - {{this.toDelete.lastName}}
      <template slot="modal-header">
        <h4
          class="warn"
        >WARNING : You're about tho delete this user and all of his/her related informations (DT).</h4>
      </template>
      <template slot="modal-footer" slot-scope="{}">
        <b-button size="sm" variant="outline-secondary" @click="confirmDelete()">Continue</b-button>
        <b-button size="sm" variant="outline-secondary" @click="cancelDelete()">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import authenticationService from "@/services/AuthenticationService";
import { VueGoodTable } from "vue-good-table";

export default {
  components: { Multiselect, VueGoodTable },
  data() {
    return {
      loadingUser: true,
      toDelete: {},
      users: [],
      roles: [],
      selectedUser: {},
      selectedRole: "",
      columns: [
        {
          label: "Name",
          field: "firstName"
        },
        {
          label: "Surname",
          field: "lastName"
        },
        {
          label: "Roles",
          field: "roles"
        },
        {
          label: "",
          field: "action"
        }
      ]
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
        this.loadingUser = false;
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
    },
    async seeDetails() {},
    async deleteConsltant(row) {
      this.toDelete = row.row;
      this.$bvModal.show("deleteModal");

      // console.log(row.row.id);
      // await this.$DeleteConsultant(row.row.id);
    },
    async confirmDelete() {
      await this.$DeleteConsultant(this.toDelete.id);
    },
    async cancelDelete() {
      this.toDelete = {};
      //[]PRUGE[]
      // for all properties of shallow/plain object
      // for (var key in obj) {
      //   // this check can be safely omitted in modern JS engines
      //   // if (obj.hasOwnProperty(key))
      //     delete obj[key];
      // }
      this.$bvModal.hide("deleteModal");
    }
  }
};
</script>

<style >
.warn {
  color: orangered;
}
.vgt-loading {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}


</style>