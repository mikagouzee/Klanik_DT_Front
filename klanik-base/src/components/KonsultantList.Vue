<template>
  <div class="container">
    <h2>Konsultants of Klanik</h2>

    <button @click="log">Log</button>
    <button @click="logCurrentUser">Log User</button>
    <div class="tables">
      <vue-good-table
        v-if="konsultants && !loading"
        :columns="columns"
        :rows="konsultants"
        :selectOptions="{
            enabled:true,
            selectOnCheckboxOnly:true
            }"
        @on-selected-rows-change="selectionChanged"
        @on-row-dblclick="seeDetails"
        :search-options="{
    enabled: true,
    skipDiacritics: true,
    placeholder: 'Search this table',
   
  }"
      >
        <div slot="selected-row-actions">
          <button @click="AddKonsultantToRecruiter">Add konsultant(s) to portfolio</button>
        </div>
      </vue-good-table>
      <h2>My Konsultants</h2>
      <vue-good-table
        v-if="managedKonsultants && !loading"
        :columns="columns"
        :rows="managedKonsultants"
        :selectOptions="{
            enabled:true,
            selectOnCheckboxOnly:true
            }"
        @on-selected-rows-change="selectionChanged"
        @on-row-dblclick="seeDetails"
        :search-options="{
    enabled: true,
  
    skipDiacritics: true,
    placeholder: 'Search this table',
   
  }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <b-button class="myButton" @click="removeKonsultant(props.row)">
              <i class="fa fa-times" aria-hidden="true"></i>
            </b-button>
          </span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>

    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{snackbarMessage}}</span>
      <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import KlanikApi from "@/services/KlanikService";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "konsultants",
  data() {
    return {
      //SnackBar
      showSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      snackbarMessage: "",
      //EndSnackBar
      loading: false,
      konsultants: [],
      unmanagedKonsultant: [],
      managedKonsultants: [],
      columns: [
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Surname",
          field: "surname"
        },
        {
          label: "Function",
          field: "function"
        },
        {
          label:"action",
          field:"action"
        }
      ]
    };
  },
  async created() {
    this.getAllKonsultants();
  },
  computed: {
    currentUser() {
      return {
        id: this.$store.getters.currentUser.sub,
        konsultants: [],
        portfolio: []
      };
    }
  },
  methods: {
    log() {
      console.log(this.currentUser);
    },
    logCurrentUser() {
      console.log(this.$store.getters.currentUser);
    },
  removeKonsultant(row){
    this.currentUser.konsultants.splice(this.currentUser.konsultants.indexOf(row.id),1)
  },
    async getAllKonsultants() {
      this.loading = true;
      try {
        this.konsultants = await KlanikApi.getAllKonsultants();
        this.portfolio = await KlanikApi.getOwnedKonsultant(
          this.currentUser.id
        ).then(r => {
          r.data.portfolio.forEach(p => {
            this.managedKonsultants.push(p);
            this.currentUser.konsultants.push(p.id);
          });
        });
      } finally {
        this.loading = false;
      }
    },
    seeDetails(params) {
      this.$router.push({
        name: "konsultantDetail",
        params: {
          konsultantId: params.row.id
        }
      });
    },
    async AddKonsultantToRecruiter() {
      return await KlanikApi.UpdateRecruiterPortfolio(this.currentUser).then(
        () => {
          this.showSnackbar = true;
          this.snackbarMessage = "Konsultant added to your portfolio.";
          this.getAllKonsultants();
        }
      );
    },
    selectionChanged(params) {
      // this.currentUser.konsultants = [];

      for (let index = 0; index < params.selectedRows.length; index++) {
        const element = params.selectedRows[index];
        if (this.currentUser.konsultants.indexOf(element.id) < 0) {
          this.currentUser.konsultants.push(element.id);
        }
      }
    }
  },
  components: {
    VueGoodTable
  }
};
</script>

<style>
.tables {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
}
</style>
