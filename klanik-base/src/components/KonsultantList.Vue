<template>
    <div class="container">
        <h2>Konsultants of Klanik</h2>

        <ol v-if="konsultants && !loading">
            <li v-for="k in konsultants" :key="k.id">
             <router-link :to="{name:'konsultantDetail', params:{konsultantId:k.id}}">
                 {{k.name + " " + k.surname }} 
             </router-link>
            </li>
        </ol>

    </div>    
</template>

<script>
import KlanikApi from '@/services/KlanikService';

export default {
    name:  'konsultants',
    data(){
        return{
            loading:false,
            konsultants:[]
        };
    },
    async created(){
        this.getAllKonsultants();
    },
    methods:{
        async getAllKonsultants(){
            //console.log("Getting all Konsultants for list page");
            this.loading = true;
            try{
                this.konsultants = await KlanikApi.getAllKonsultants();
            } finally{
                this.loading = false;
            }
        }
    }
}
</script>

<style>

</style>

