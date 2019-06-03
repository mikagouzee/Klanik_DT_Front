<template>
    <div class="container">
        <div class="button-box">
            <button @click="log">Log</button>
            <button @click="update">Save</button>
        </div>

        <div class="CV">

            <section class="row-info">
                <div class="section-title">
                    <h2> Summary</h2>
                </div>
                
                <div class="section-content">
                    <div class="box-name">
                        <label>Name :</label>
                        <input v-model="konsultant.name" placeholder="Name">
                        <br>
                        <label>Surname :</label>
                        <input v-model="konsultant.surname" placeholder="Surname">
                        <br>
                    </div>

                    <div class="box-summary">
                        <label>Function :</label>
                        <input v-model="konsultant.function" placeholder="Function">
                        <br>
                        <label>Availability :</label>
                        <input :value="konsultant.availability | toDate " placeholder="Available beginning">
                    </div>
                </div>
            </section>

            <section class="row-competences">
                 <div class="section-title">
                    <img src="../assets/pictos/competence.png" alt="comp-icon" align="top">
                    <h2> Competences</h2>
                </div>

                <div class="section-content">
                    <div class="box-competences">

                        <div class="existingComp" v-for="comp in konsultant.competences.filter(x => !x.isDeleted)" :key="comp.id">
                            <input v-model="comp.name"> : <input v-model.number="comp.rating">
                            Include : <input type="checkbox" v-model="comp.isRelevant">
                             <button @click="removeFromList(comp, konsultant.competences)">X</button>
                        </div>

                         <div class="form">
                            <label>New competence :</label>
                            <input v-model="newCompetence.name" placeholder="Name"><br>
                            <label>Rating :</label>
                            <input v-model.number="newCompetence.rating" placeholder="Rating (from 1 to 5)"><br>
                            <button @click="addToList(newCompetence, konsultant.competences, 2)">Add</button>
                        </div>
                    </div>

                    <div class="box-languages">
                        <h4>Languages :</h4>
                        <div class="lang" v-for="lang in konsultant.languages.filter(x => !x.isDeleted)" :key="lang.id">
                            <input v-model="lang.name"> : <input type="number" v-model.number="lang.fluency"> 
                            Include : <input type="checkbox" v-model="lang.isRelevant">
                            <button @click="removeFromList(lang, konsultant.languages)">X</button>
                        </div>

                        <div class="form">
                            <label>New language :</label>
                            <input v-model="otherLanguage.name" placeholder="Name">
                            <input v-model.number="otherLanguage.fluency" placeholder="Fluency (from 1 to 5)">
                            <button @click="addToList(otherLanguage, konsultant.languages, 2)">Add</button>
                        </div>
                    </div>
                </div>

            </section>          

            <section class="row-education">
                 <div class="section-title">
                    <img src="../assets/pictos/education.png" alt="edu-icon"><h2>Education</h2>
                </div>

                <div class="section-content">

                    <div class="box-edu" v-for="edu in konsultant.educations.filter(x => !x.isDeleted)" :key="edu.id">
                        <!-- From <v-text-field :value="edu.startDate | toDate" @input="value => edu.startDate = value"></v-text-field> -->
                        From <input :value="edu.startDate  | toDate" > 
                        to <input :value="edu.endDate | toDate" > :  <input v-model="edu.name">
                            Include : <input type="checkbox" v-model="edu.isRelevant">
                            <button @click="removeFromList(edu, konsultant.educations)">X</button>
                    </div>


                    <div class="form">
                        <label>New education :</label>
                        <input v-model="otherEducation.name" placeholder="Name">
                        <input v-model="otherEducation.startDate" placeholder="Starting date" type="date">
                        <input v-model="otherEducation.endDate" placeholder="End date" type="date">
                        <button @click="addToList(otherEducation, konsultant.educations, 3)">Add</button>
                    </div>

                </div>
            </section>

            <section class="row-certificates">
                <div class="section-title">
                    <img src="../assets/pictos/certificate.png" alt="cert-icon"><h2>Certificates/Clearance</h2>
                </div>

                <div class="section-content">
                    <div class="box-certif" v-for="cert in konsultant.certificates.filter(x => !x.isDeleted)" :key="cert.id">
                        <input v-model="cert.name"> : obtained on <input :value="cert.obtension | toDate"> 
                        <br>
                        Valid until <input :value="cert.endOfValidity | toDate">
                            Include : <input type="checkbox" v-model="cert.isRelevant">
                            <button @click="removeFromList(cert, konsultant.certificates)">X</button>
                    </div>

                    <div class="form">
                        <label>
                            New certificate :
                        </label>

                        <input v-model="otherCertificate.name" placeholder="Name">
                        <input v-model="otherCertificate.obtension" placeholder="Starting Date" type="date">
                        <input v-model="otherCertificate.endOfValidity" placeholder="End date" type="date">

                        <button @click="addToList(otherCertificate, konsultant.certificates, 3)">Add</button>
                    </div>

                </div>
            </section>

            <section class="row-experience">
                    <div class="section-title">
                        <img src="../assets/pictos/experience.png" alt="exp-icon"><h2>Professional Experiences</h2>
                    </div>
                
                    <div class="section-content">
                        <div class="box-exp" >
                            <professionalExperience 
                            v-for="exp in konsultant.professionalExperiences.filter(x => !x.isDeleted)" 
                            :key="exp.id" 
                            v-bind:professionalExperience="exp">

                            </professionalExperience>

                            
                        </div>

                        <div class="form">
                            <h4>Add Professional Experience</h4>
                                <input v-model="otherProfessionalExperience.position" placeholder="Position">
                                <input v-model="otherProfessionalExperience.startDate" placeholder="started on" type="date">
                                <input v-model="otherProfessionalExperience.endDate" placeholder="ended on" type="date">
                                <input v-model="otherProfessionalExperience.customer" placeholder="Company">
                                <input v-model="otherProfessionalExperience.summary" placeholder="summary">
                            <button @click="addToList(otherProfessionalExperience, konsultant.professionalExperiences,5)">Add</button>
                            <br>
                        </div>

                    </div>

            </section>

            <section class="row-references">
                <div class="section-title">
                    <img src="../assets/pictos/reference.png" alt="reference-icon"> <h2>References</h2>
                </div>  

                <div class="section-content">
                    <div class="box-refer" v-for="ref in konsultant.professionalReferences.filter(x => !x.isDeleted)" :key="ref.id">
                        <input v-model="ref.name">
                        <input v-model="ref.surname">
                        <input v-model="ref.function">
                        <input v-model="ref.mail">
                        <input v-model="ref.phone">
                        <input v-model="ref.company">
                         <button @click="removeFromList(ref, konsultant.professionalReferences)">X</button>
                    </div>

                    <div class="form">
                           <label>Name :</label> <input v-model="otherReference.name" placeholder="Name"> <br>
                           <label>Surname :</label> <input v-model="otherReference.surname" placeholder="Surname"> <br>
                           <label>Function :</label> <input v-model="otherReference.function" placeholder="Function"> <br>
                           <label>Mail :</label> <input v-model="otherReference.mail" placeholder="Mail" type="email"> <br>
                           <label>Phone :</label> <input v-model="otherReference.phone" placeholder="Phone" type="tel"> <br>
                            <label>Company :</label> <input v-model="otherReference.company" placeholder="Company"> <br>
                            <button @click="addToList(otherReference, konsultant.professionalReferences, 6)" >Add</button>
                    </div>

                </div>

            </section>

        </div>
    </div>
</template>

<script>
import KlanikApi from '@/services/KlanikService';

import professionalExperience from './ProfessionalExperience';

import {dateFilter} from '../tools/filters';

export default {
    name: 'KonsultantEdition',
    components:{
        professionalExperience:professionalExperience,
    },
    filters:{
        toDate : dateFilter
    },
    data(){
        return{
             konsultant: {
                competences: [],
                languages: [],
                educations: [],
                certificates: [],
                professionalExperiences: [],
                professionalReferences:[]
            },

            newCompetence: {
                id:'',
                isRelevant : true,
                isDeleted : false
            },
            otherLanguage: {
                id:'',
                isRelevant : true,
                isDeleted : false                
            },
            otherEducation: {
                id:'',
                isRelevant : true,
                isDeleted : false                
            },
            otherCertificate: {
                id:'',
                isRelevant : true,
                isDeleted : false                
            },
            otherProfessionalExperience: {
                id: '',
                isRelevant : true,
                isDeleted : false,
                accomplishments: [],
                technicalEnvironments: []
            },
            otherAccomplishment:{
                id:'',
                isRelevant : true,
                isDeleted : false
            },
            otherTechnical:{
                id:'',
                isRelevant : true,
                isDeleted : false                
            },
            otherReference:{
                id:'',
                isRelevant : true,
                isDeleted : false        
            }
        }
    },
    async created(){
        if(this.$store.getters.selectedKonsultant != null &&
             Object.keys(this.$store.getters.selectedKonsultant).length
             && this.$store.getters.selectedKonsultant.id == this.$route.params.konsultantId)
            {
                console.log("Edition using store konsultant");
                this.konsultant = this.$store.getters.selectedKonsultant;
            }
        else
            this.konsultant = await KlanikApi.getKonsultantById(this.$route.params.konsultantId); 
    },
    computed:{
        competenceList() {
            return this.konsultant.competences;
        },
        languageList() {
            return this.konsultant.languages;
        },
        educationList() {
            return this.konsultant.educations;
        },
        certificatesList() {
            return this.konsultant.certificates;
        },
        professionalExperienceList() {
            return this.konsultant.professionalExperiences;
        },
        referencesList(){
            return this.konsultant.professionalReferences;
        },    
        firstHalfSkill(){
            let firstHalf = [];
            
            for(let i= 0; i < Math.round(this.konsultant.competences.length/2); i++){
                firstHalf.push(this.konsultant.competences[i]);
            }
            return firstHalf;
        },
        secondHalfSkill(){
            let secondHalf = [];

            for(let i= Math.round(this.konsultant.competences.length/2); i < this.konsultant.competences.length; i++){
                secondHalf.push(this.konsultant.competences[i]);
            }
            return secondHalf;
        }
    },
    methods:{
        async save() {
            //console.log("Saving " + this.konsultant.name);
            this.$store.dispatch('SelectKonsultant', this.konsultant); 
            await KlanikApi.createKonsultant(this.konsultant);
        },

        async update(){
            this.$store.dispatch('SelectKonsultant', this.konsultant);
            await KlanikApi.updateKonsultant(this.konsultant);
        },

        log(){
            console.log(JSON.stringify(this.konsultant, null, 4));
        },

        addToList: function(value, list, expectedlength) {   
            if(Object.keys(value).length >= expectedlength){
                // console.log(Object.keys(value)); 
                list.push(value);

            }    
        },
        removeFromList: function(value, list){
            if(list.indexOf(value) > -1){
                // list.splice(list.indexOf(value), 1);
                this.markAsDeleted(value);
            }
        },
        markAsDeleted: function(value){
            value.isDeleted = true;
        }
    },
    watch:{
        konsultant:{
            handler(val){
                console.log("konsultant changed");
                this.$store.dispatch('SelectKonsultant', this.konsultant); 
            },
            deep: true
        },
        competenceList() {
            this.newCompetence = {
                 id: '',
                isRelevant : true,
                isDeleted : false
            };
        },
        languageList() {
            this.otherLanguage = {
                id: '',
                isRelevant : true,
                isDeleted : false                
            };
        },
        educationList() {
            this.otherEducation = {
                 id: '',
                isRelevant : true,
                isDeleted : false                
            };
        },
        certificatesList() {
            this.otherCertificate = {
                id: '',
                isRelevant : true,
                isDeleted : false                
            };
        },
        professionalExperienceList() {
            this.otherProfessionalExperience = {
                id:'',
                isRelevant : true,
                isDeleted : false,                
                accomplishments: [],
                technicalEnvironments: []
            };
            this.otherAccomplishment = {
                id: '',
                isRelevant : true,
                isDeleted : false                
            };
            this.otherTechnical = {
                id: '',
                isRelevant : true,
                isDeleted : false                
            };
        },
        referenceList(){
            this.otherReference = {
                id: '',
                isRelevant : true,
                isDeleted : false,                
            };
        }
    }
}
</script>

<style>

@font-face{
    font-family:'NewJuneBold';
    src:url('../assets/fonts/NewJune-Bold.otf');
}

@font-face {
  font-family: 'Titillium';
  src: url('../assets/fonts/TitilliumWeb-Regular.ttf');
}

@font-face {
  font-family:'Titillium-title';
  src: url('../assets/fonts/TitilliumWeb-Bold.ttf')
}

.CV{
    background-color:mintcream;
    display:grid;   
    font-family:Titillium
}

section{
  padding:20px;
}

.section-title{
  font-family: 'Titillium-Title';
  /* padding-left:5px; */
  display:grid;

  grid-template-columns: 05% 95%;
  align-items:center;
  color:white;
  font-style:bold;
}

.section-title img{
  grid-column:1;
  height: 60px;
  margin-right:5px;
  z-index:1;
  align-self:start;
}

.section-title h2{
  grid-column:2;
  
  align-self:end;
  padding:-5px;
  padding-left:10px;
  background-clip:padding-box;
  background-color:#4d7dad;
}

.section-content{
  margin-left:50px;
  grid-row-gap:30px;
}

.row-info .section-content{
    display:grid;
    grid-template-columns: 50%50%
}

.box-name{
    grid-column:1;   
    font-size:150%;

    display:grid;
    grid-template-columns: 30% 70%
}

.box-name label{
    grid-column: 1;
}
.box-name input{
    grid-column: 2;
    justify-self: left;
}

.box-summary{
    grid-column:2;
    font-size:125%;

    display:grid;
    grid-template-columns: 30% 70%
}

.box-summary label{
    grid-column:1;
}

box-summary input{
    grid-column:2;
    justify-self: left;
}

.row-competences .section-content{
  display:grid;

  grid-template-columns: 50% 50%;
  grid-template-rows:auto;

  /* grid-gap:15px; */
  justify-content:stretch;
  align-items:left;
}

.box-competences{
  /* background-color:aquamarine;    */
  grid-column: 1/span 2;
  grid-row: 1;
  grid-row-gap:5px;
  display:grid;
  grid-template-columns: 50% 50%;

  justify-self: stretch;
}

.box-languages{
    grid-column:1;
    display:grid;
    grid-template-rows: auto;
    grid-row-gap:5px;
}

.form{
    margin-top:5px;
    grid-column:1;

    display:grid;
    grid-template-columns:50% 50%;
    grid-row-gap:5px;
}

.form label, button{
    grid-column:1;
}

.form input{
    grid-column:2;
    padding:3px;
}

</style>
