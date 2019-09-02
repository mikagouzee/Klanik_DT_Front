<template>
  <div class="LeftBoxed">
    <b-form inline>
      <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="newComp"></b-input>
      <b-button variant="primary" @click="AddToList()">Add</b-button>
    </b-form>
    <p></p>
    <vue-good-table
      v-if="this.prop == 'Admin'"
      :columns="columns"
      :rows="rows"
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
          <md-button class="md-icon-button" @click="removeFromList(props.row)">
            <md-icon>remove_circle_outline</md-icon>
          </md-button>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import KlanikApi from "@/services/KlanikService";

export default {
  props: ["from"],
  name: "Competences",
  data() {
    return {
      prop: this.from,
      newComp: "",
      columns: [
        {
          label: "Competences",
          field: "name"
        },
        {
          label: "",
          field: "action"
        }
      ],
      rows: []
    };
  },
  created() {
    KlanikApi.GetAllComp().then(c => {
      this.rows = c.data;
    });
  },
  mounted() {},
  computed: {},
  methods: {
    removeFromList: function(row)  {
      let comp= { Id: row.id, Name: row.name };
      KlanikApi.RemoveCompetence(comp).then(r=>{
        this.rows= r.data
      });
    },
    AddToList: function() {
      KlanikApi.AddCompetences(this.newComp).then(r => {
        this.rows = r.data;
      });
    }
  }
};
</script>

<style >
.LeftBoxed {
  display: grid;
  grid-template-columns: 1fr;
}
</style>