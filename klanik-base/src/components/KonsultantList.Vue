<template>
<div class="container">
    <h2>Konsultants of Klanik</h2>

    <!-- <ol v-if="konsultants && !loading">
        <li v-for="k in konsultants" :key="k.id">
            <router-link :to="{name:'konsultantDetail', params:{konsultantId:k.id}}">
                {{k.name + " " + k.surname }}
            </router-link>
        </li>
    </ol> -->
    <vue-good-table v-if="konsultants && !loading" :columns="columns" :rows="konsultants" @on-row-click="onRowClick" />
</div>
</template>

<script>
import KlanikApi from '@/services/KlanikService';
import {
    VueGoodTable
} from 'vue-good-table';
export default {
    name: 'konsultants',
    data() {
        return {
            loading: false,
            konsultants: [],
            columns: [{
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Surname',
                    field: 'surname'
                },
                {
                    label: 'Function',
                    field: 'function',
                    filterOptions: {
                        enabled: true, // enable filter for this column
                        placeholder: 'Filter by function', // placeholder for filter input
                    },

                }
            ]
        };
    },
    async created() {
        this.getAllKonsultants();
    },
    methods: {
        async getAllKonsultants() {
            //console.log("Getting all Konsultants for list page");
            this.loading = true;
            try {
                this.konsultants = await KlanikApi.getAllKonsultants();
            } finally {
                this.loading = false;
            }
        },
        onRowClick(params) {
            this.$router.push({
                name: 'konsultantDetail',
                params: {
                    konsultantId: params.row.id
                }
            })
        }
    },
    components: {
        VueGoodTable
    }
}
</script>

<style>

</style>
