<template>
  <dir class="root">
    <b-form inline class="AddBu">
      <multiselect
        v-model="BusinessUnit.contry"
        placeholder="Search ... "
        :options="countries"
        :searchable="true"
        :internal-search="true"
        track-by="id"
        label="name"
      ></multiselect>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" v-model="BusinessUnit.name"></b-input>
      <b-button variant="primary" @click="AddToList()">Add</b-button>
    </b-form>
    <vue-good-table
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
          <md-button class="md-icon-button" @click="Remove(props.row)">
            <md-icon>remove_circle_outline</md-icon>
          </md-button>
        </span>
        <span v-else-if="props.column.field=='contry'">{{props.row.contry.name}}</span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </dir>
</template>

<script>
import KlanikApi from "@/services/KlanikService";
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      countries: [],
      columns: [
        {
          label: "Business units",
          field: "name"
        },
        {
          label: "Country",
          field: "contry"
        },
        {
          label: "",
          field: "action"
        }
      ],
      rows: [],
      BusinessUnit: {}
    };
  },
  mounted() {
    KlanikApi.GetAllBu().then(bu => {
      bu.data.forEach(b => {
        this.rows.push(b);
      });
    });
    KlanikApi.GetAllCountries().then(c => {
      this.countries = c.data;
    });
  },
  methods: {
    AddToList: function() {
      KlanikApi.AddBu(this.BusinessUnit).then(bu => {
        this.rows.push(this.BusinessUnit);
      });
    },
    Remove: function(param) {
      console.log(param);
      KlanikApi.RemoveBu(param).then(bu => {
        this.rows = [];
        bu.data.forEach(b => {
          this.rows.push(b);
        });
      });
    }
  }
};
</script>

<style >
.AddBu {
  display: grid;
  grid-template-columns: 1fr 1fr 5% 1fr;
  grid-column-gap: 1em;
  margin-bottom: 1em;
}
</style>