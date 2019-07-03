<template>
  <div class="container">
    <h2>Konsultants of Klanik</h2>

    <button @click="log">Log</button>
    <button @click="logCurrentUser">Log User</button>
    <div class="tables">
      <vue-good-table
        ref="AllK"
        v-show="konsultants && !loading"
        :columns="columns"
        :rows="konsultants"
        :selectOptions="{
            enabled:true,
            selectOnCheckboxOnly:true
            }"
        @on-row-click="toggleSelectRow"
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
        <!-- <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <b-checkbox @change="checkboxchanged">Is Actif ATM</b-checkbox>
          </span>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>-->
      </vue-good-table>
    </div>

    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{snackbarMessage}}</span>
      <md-button @click="showSnackbar = false">Ok</md-button>
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
        } //,
        // {
        //   label: "action",
        //   field: "action"
        // }
      ]
    };
  },
  async created() {
    this.getAllKonsultants();
  },
  mounted: function() {},
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
    checkboxchanged(p) {},
    log() {
      console.log(this.currentUser);
    },
    logCurrentUser() {
      console.log(this.$store.getters.currentUser);
    },
    async removeKonsultant(row) {
      this.currentUser.konsultants.splice(
        this.currentUser.konsultants.indexOf(row.id),
        1
      );
      this.managedKonsultants.splice(this.managedKonsultants.indexOf(row), 1);
      this.AddKonsultantToRecruiter();
    },
    async getAllKonsultants() {
      this.loading = true;
      let that = this;
      try {
        this.konsultants = await KlanikApi.getAllKonsultants();
        console.log(this.konsultants);
        this.portfolio = await KlanikApi.getOwnedKonsultant(
          this.currentUser.id
        ).then(r => {
          console.log(r);
          r.data.portfolio.forEach(p => {
            this.currentUser.konsultants.push(p.id);
          });
        });
      } finally {
        this.loading = false;
        if (this.currentUser.konsultants) {
          this.currentUser.konsultants.forEach(kons => {
            that.$refs["AllK"].rows.forEach(function(e) {
              if (e["id"] == kons) {
                that.$set(e, "vgtSelected", true);
              }
            });
          });
        }
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
        r => {
          console.log("resp");
          console.log(r);
          this.showSnackbar = true;
          if (r.length > 0) {
            r.forEach(element => {
              this.snackbarMessage += element + ".\n";
            });
          } else {
            this.snackbarMessage = "Konsultant added to your portfolio.";
          }
        }
      );
    },
    toggleSelectRow(params) {
      //If parame has 'selected' -> It's a check box.
      console.log(params);
      if (params.selected) {
        if (this.currentUser.konsultants.indexOf(params.row.id) < 0) {
          this.currentUser.konsultants.push(params.row.id);
        }
      } else {
        this.currentUser.konsultants.splice(
          this.currentUser.konsultants.indexOf(params.row.id),
          1
        );
      }
    },
    selectionChanged(params) {
      // for (let index = 0; index < params.selectedRows.length; index++) {
      //   const element = params.selectedRows[index];
      //   console.log(params.selected);
      //   if (element.vgtSelected) {
      //     if (this.currentUser.konsultants.indexOf(element.id) < 0) {
      //       this.currentUser.konsultants.push(element.id);
      //     }
      //   } else {
      //     this.currentUser.konsultants.splice(
      //       this.currentUser.konsultants.indexOf(element.id),
      //       1
      //     );
      //   }
      // }
    }
  },

  components: {
    VueGoodTable
  }
};
</script>

<style>
.container {
  margin-bottom: 25px;
}
.tables {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
}
</style>
