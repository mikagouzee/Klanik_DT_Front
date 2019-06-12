<template>
<div class="container">
    <h2>Konsultants of Klanik</h2>

    <button @click="log">Log</button>
    <button @click="logCurrentUser">Log User</button>

    <vue-good-table v-if="konsultants && !loading" 
        :columns="columns" 
        :rows="konsultants" 
        :selectOptions="{
            enabled:true,
            selectOnCheckboxOnly:true
            }"
        @on-selected-rows-change="selectionChanged"
        @on-row-dblclick="seeDetails">
    
    <div slot="selected-row-actions">
        <button @click="AddKonsultantToRecruiter">Add konsultant(s) to portfolio</button>
    </div>
    </vue-good-table>
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
            ],
            
        };
    },
    async created() {
        this.getAllKonsultants();
    },
    computed: {
        currentUser(){
                return  {
                    id: this.$store.getters.currentUser.sub,
                    konsultants:[]
                }
            }
    },
    methods: {
        log(){
            console.log(this.currentUser);
        },
        logCurrentUser(){
            console.log(this.$store.getters.currentUser);
        },

        async getAllKonsultants() {
            //console.log("Getting all Konsultants for list page");
            this.loading = true;
            try {
                this.konsultants = await KlanikApi.getAllKonsultants();
            } finally {
                this.loading = false;
            }
        },
        seeDetails(params) {
            this.$router.push({
                name: 'konsultantDetail',
                params: {
                    konsultantId: params.row.id
                }
            })
        },
        async AddKonsultantToRecruiter(){
            return await KlanikApi.UpdateRecruiterPortfolio(this.currentUser);
        },
        selectionChanged(params){
            this.currentUser.konsultants = [];

            for (let index = 0; index < params.selectedRows.length; index++) {
                const element = params.selectedRows[index];
                this.currentUser.konsultants.push(element.id);
            }
        }
        
    },
    components: {
        VueGoodTable
    }
}
</script>

<style>

</style>
