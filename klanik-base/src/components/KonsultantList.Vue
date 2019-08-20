<template>
  <div class="container">
    <h2>Konsultants of Klanik</h2>

    <!-- <b-button @click="log" variant="light">Log</b-button>
    <b-button @click="logCurrentUser" variant="light">Log User</b-button>-->
    <b-button variant="light" @click="AddKonsultantToRecruiter">Update my Konsultant</b-button>
    <b-button variant="outline-primary" @click="AddKonsultant">Add a Konsultant</b-button>

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
          placeholder: 'Search this table'}"
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
            <md-button class="md-icon-button" @click="seeDetails(props)">
              <md-icon>visibility</md-icon>
            </md-button>
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
      <md-button @click="showSnackbar = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import KlanikApi from "@/services/KlanikService";
import { VueGoodTable } from "vue-good-table";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "konsultants",
  data() {
    return {
      //CheckEditor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["bold", "italic", "bulletedList", "numberedList"]
      },
      //button
      pristine: "light",
      disabledButton: true,
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
          label: "",
          field: "action"
        }
      ]
    };
  },
  async created() {
    this.loading = true;
    this.getAllKonsultants();
  },
  mounted: function() {},
  computed: {
    currentUser() {
      return {
        id: this.$store.getters.currentUser.sub,
        recruiter: {
          Name: this.$store.getters.currentUser.family_name,
          Surname: this.$store.getters.currentUser.given_name
        },
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
      console.log(params);
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
          this.showSnackbar = true;
          if (r.length > 0) {
            r.forEach(element => {
              this.snackbarMessage += element + ".\n";
            });
          } else {
            this.snackbarMessage = "Konsultant added to your portfolio.";
            this.pristine = "light";
            this.disabledButton = false;
          }
        }
      );
    },
    AddKonsultant() {
      this.$router.push({ path: "/konsultant/new" });
    },
    toggleSelectRow(params) {
      console.log(params.selected);
      this.pristine = "warning";
      this.disabledButton = false;
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
    selectionChanged(params) {}
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
