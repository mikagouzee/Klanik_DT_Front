<template>
  <div class="container">
    <div class="box buttons">
      <button @click="save">Save</button>
      <button v-if="saved" @click="details">See your profile</button>

      <button @click="log">Log context</button>
    </div>
      <h1>Konsultant</h1>

    <div class="cv">

      <section class="box-header">
        <div class="Klanik-logo">
          <img src="../assets/pictos/logo1.png" alt="logo" class="logo">
        </div>

        <div class="box-infos">
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
            <input v-model="konsultant.availability" placeholder="Available beginning" type="date">
          </div>      
        </div>

        <div class="Klanik-titleBar">
          Klanik Consulting
        </div>
        
      </section>

      <section class="box row-competences">
        <div class="section-title">
          <img src="../assets/pictos/competence.png" alt="comp-icon" align="top">
          <h2> Competences</h2>
        </div>

        <div class="section-content">
          <div class="box box-competences">
            <div class="form">
              <label>New competence :</label>
              <input v-model="newCompetence.name" placeholder="Name"><br>
              <label>Rating :</label>
              <input type="number" v-model="newCompetence.rating" placeholder="Rating (from 1 to 5)"><br>
              <button @click="addToList(newCompetence, konsultant.competences, 2)">Add</button>
            </div>

            <div class="existing">
              <table class="skillTable1"> 
                <tr v-for="thiscomp in firstHalfSkill" :key="thiscomp.name">
                  <td class="skill">{{thiscomp.name}}</td>
                  <td class="skill">{{thiscomp.rating}}</td>
                  <td class="skill"><button @click="removeFromList(thiscomp, konsultant.competences)" >X</button></td>
                </tr>
              </table>
                          
              <table class="skillTable2">
                <tr v-for="thatcomp in secondHalfSkill" :key="thatcomp.name">
                  <td class="skill">{{thatcomp.name}}</td>
                  <td class="skill">{{thatcomp.rating}}</td>
                  <td class="skill"><button @click="removeFromList(thatcomp, konsultant.competences)" >X</button></td>
                </tr>
              </table>
            </div>
          </div>

          <div class="box box-languages">
              <label>New language :</label>
              <input v-model="otherLanguage.name" placeholder="Name">
              <input type="number" v-model="otherLanguage.fluency" placeholder="Fluency (from 1 to 5)">
              <button @click="addToList(otherLanguage, konsultant.languages, 2)">Add</button>

              <table>
                  <tr v-for="l in konsultant.languages" :key="l.name">
                      <td>{{l.name}}</td>
                      <td>{{l.fluency}}</td>
                      <td><button @click="removeFromList(l, konsultant.languages)" >X</button></td>
                  </tr>
              </table>

          </div>

          <div class="box box-legend">
              « I have some competences <br>
              «« I know how to do but I need support <br>
              ««« Good level <br>
              «««« Very good level / mastering the topic <br>
              ««««« Subject Matter Expert 
          </div>

        </div>

    
      </section>

      <section class="box row-education">
          <div class="section-title">
            <img src="../assets/pictos/education.png" alt="edu-icon"><h2>Education</h2>
          </div>
      
          <div class="section-content">
            <label>New education :</label>
            <input v-model="otherEducation.name" placeholder="Name">
            <input v-model="otherEducation.startDate" placeholder="Starting date" type="date">
            <input v-model="otherEducation.endDate" placeholder="End date" type="date">
            <button @click="addToList(otherEducation, konsultant.educations, 3)">Add</button>

            <table v-if="konsultant.educations !=null && konsultant.educations.length">
              <tr v-for="e in konsultant.educations" :key="e.name">
                <td> {{e.startDate}} to {{e.endDate}}</td>
                <td>{{e.name}}</td> 
                <td><button @click="removeFromList(e, konsultant.educations)" >X</button></td>

              </tr>
            </table>
          </div>

      </section>

      <section class="box row-certificate">
        <div class="section-title">
          <img src="../assets/pictos/certificate.png" alt="cert-icon"><h2>Certificates/Clearance</h2>
        </div>
      

        <div class="section-content">
          <label>
            New certificate :
          </label>

          <input v-model="otherCertificate.name" placeholder="Name">
          <input v-model="otherCertificate.startDate" placeholder="Starting Date" type="date">
          <input v-model="otherCertificate.EndOfValidity" placeholder="End date" type="date">

          <button @click="addToList(otherCertificate, konsultant.certificates, 3)">Add</button>
              
          <table v-if="konsultant.certificates != null && konsultant.certificates.length">
            <tr v-for="c in konsultant.certificates" :key="c.name">
              <td>{{c.startDate.substring(0,10)}}</td>
              <td>{{c.name}}</td>
              <td><button @click="removeFromList(c, konsultant.certificates)" >X</button></td>

            </tr>
          </table>
          
        </div>
        
      </section>

      <section class="box row-professionalExperience">
          <div class="section-title">
            <img src="../assets/pictos/experience.png" alt="exp-icon"><h2>Professional Experiences</h2>
          </div>

        <div class="section-content">
          <h4>Add Professional Experience</h4>
            <input v-model="otherProfessionalExperience.position" placeholder="Position">
            <input v-model="otherProfessionalExperience.startDate" placeholder="started on" type="date">
            <input v-model="otherProfessionalExperience.endDate" placeholder="ended on" type="date">
            <input v-model="otherProfessionalExperience.Customer" placeholder="Company">
            <input v-model="otherProfessionalExperience.summary" placeholder="summary">
          <button @click="addToList(otherProfessionalExperience, konsultant.professionalExperiences,5)">Add</button>
          <br>
          
          <div v-if="konsultant.professionalExperiences!=null && konsultant.professionalExperiences.length">
            <professionalExperience
              v-for="pe in konsultant.professionalExperiences"
              v-bind:key="pe.position"
              v-bind:professionalExperience="pe">
            </professionalExperience>

          </div>

        </div>      

      </section>

      <section class="box row-professionalReference">
        <div class="section-title">
          <img src="../assets/pictos/reference.png" alt="reference-icon"> <h2>References</h2>
        </div>

        <div class="section-content box-references">
          <div class="form">
            <label>Name :</label> <input v-model="otherReference.name" placeholder="Name"> <br>
            <label>Surname :</label> <input v-model="otherReference.surname" placeholder="Surname"> <br>
            <label>Function :</label> <input v-model="otherReference.function" placeholder="Function"> <br>
            <label>Mail :</label> <input v-model="otherReference.mail" placeholder="Mail" type="email"> <br>
            <label>Phone :</label> <input v-model="otherReference.phone" placeholder="Phone" type="tel"> <br>
            <label>Company :</label> <input v-model="otherReference.company" placeholder="Company"> <br>
            <button @click="addToList(otherReference, konsultant.professionalReferences, 6)" >Add</button>
          </div>

          <ul>
            <li v-for="ref in konsultant.professionalReferences" :key="ref.name">
              {{ref.surname}}, {{ref.name}}, {{ref.function}}, {{ref.mail}}, {{ref.phone}}, {{ref.company}}
              <button @click="removeFromList(ref, konsultant.professionalReferences)">X</button>
            </li>
          </ul>

        </div>

      </section>

    </div>

  </div>

</template>

<script>
import KlanikApi from "@/services/KlanikService";

import professionalExperience from "./ProfessionalExperience";

export default {
  name: "konsultantCreation",
  components: {
    professionalExperience: professionalExperience
  },
  data() {
    return {
      ready: false,

      saved : false,
      currentId: '',

      konsultant: {
        id: '',
        competences: [],
        languages: [],
        educations: [],
        certificates: [],
        professionalExperiences: [],
        professionalReferences:[],
        optIn : false
      },
    
      newCompetence: {
        isRelevant:true,
      },
      otherLanguage: {        
        isRelevant:true,
      },
      otherEducation: {
        isRelevant:true,
      },
      otherCertificate: {
        isRelevant:true,
      },
      otherProfessionalExperience: {
        isRelevant:true,
        accomplishments: [],
        technicalEnvironments: []
      },
      otherReference:{}
    }
  },
  mounted() {
    this.konsultant.optIn =  this.$store.getters.GetOptIn;
  },
  computed: {
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
  methods: {
    log(){
       console.log( this.$store.getters)
      console.log( this.$store.getters.GetOptIn);
      console.log(JSON.stringify(this.konsultant, null, 4));
    },

    async save() {
      //console.log("Saving " + this.konsultant.name);
      this.konsultant.id = this.$store.getters.currentUser.sub;
      await KlanikApi.createKonsultant(this.konsultant)
        .then(
          res => {
            console.log("return of creation : ", res);
            this.saved = true;
            this.currentId = res;},
          ko => {console.log("Error while saving konsultant...")}
        );
    },
    details(){
      this.$router.push({name:'konsultantDetail', params:{konsultantId:this.currentId}});
    },
    addToList: function(value, list, expectedlength) {   
        if(Object.keys(value).length >= expectedlength){
            // console.log(Object.keys(value)); 
            list.push(value);
        }    
    },
    removeFromList: function(value, list){
      if(list.indexOf(value) > -1)
        list.splice(list.indexOf(value), 1);
    }
    
  },
  watch: {
    competenceList() {
      this.newCompetence = {
        isRelevant:true,
      };
    },
    languageList() {
      this.otherLanguage = {
        isRelevant:true,
      };
    },
    educationList() {
      this.otherEducation = {
        isRelevant:true,
      };
    },
    certificatesList() {
      this.otherCertificate = {
        isRelevant:true,        
      };
    },
    professionalExperienceList() {
      this.otherProfessionalExperience = {
        isRelevant:true,        
        accomplishments: [],
        technicalEnvironments: []
      };
      this.otherAccomplishment = {
        isRelevant:true,
      };
      this.otherTechnical = {
        isRelevant:true,
      };
    },
    referencesList(){
      this.otherReference = {};
    }
  }
};
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

.cv{
  display:inline-grid;
  font-family:Titillium;
  text-align:left;
  border:1px solid green;
}

.Klanik-titleBar{
    grid-column:2;
    grid-row:2;
    font-family:NewJuneBold;
    font-size:50px;
    background-color:#041d36;
    color:white;
    text-align:right;
    padding:5px;
    margin-right:5px;
    align-self: end;
    /* max-height:75px; */
}

.box-infos{
    padding-top: 5px;
    margin-left:50px;
    display:grid; 
    grid-template-columns: 50% 50%;
    font-family:Titillium-title;

    /* border:1px dashed blue; */
}

.box-name{
    grid-column:1;   
}

.box-summary{
    grid-column:2;
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
  text-align:center;
  align-self:end;
  padding:-5px;
  padding-left:10px;
  background-clip:padding-box;
  background-color:#4d7dad;
}


.section-content{
  margin-left:50px;
}


.row-competences .section-content{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows:auto;
  grid-row-gap: 15px;
  grid-column-gap:15px;
  justify-content:stretch;
  align-items:left;
}

.box-competences{
  grid-column: 1/span 2;

  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows:auto;
  justify-self: stretch;

}

.box-references{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows:auto;
}

.form{
  grid-column:1;
  grid-row:1;
  display:grid;
  grid-gap:0.5em;
}

.form label{
  grid-column:1;
}
.form input{
  grid-column:2;
  max-width:auto;
}

.existing{
  grid-column:1/span 2;
  grid-row:2;

  display:grid;
  columns:50% 50%;
}

td.skill {
    background-color:ghostwhite;
    padding: 3px;
    text-align: center;
}

.skillTable1 {
    grid-column:1;    
    border-collapse: separate;
    border-spacing: 5px 1px;
    margin-right: 25px;
    width: 100%;
    height:100%;
    text-align:center;
}

.skillTable2 {
    grid-column:2;    
    border-collapse: separate;
    border-spacing: 5px 1px;
    margin-right: 25px;
    width: 100%;
    height:100%;
    text-align:center;
}

.box-languages{
  grid-column: 1;
  grid-row:2;
  justify-self: stretch;
}

.box-legend{
  grid-column:2;
  grid-row:2;
}

.logo{
  width:100%;
  height:100%;
}

.table-header{
  background-color:#1d3652;
  color:white;
  margin:5px;
  padding:5px;
  font-style: bold;
}

.table {
  border-collapse: collapse;
  padding:5px;
  height:100%;
  width:100%;
  text-align:center;
}
.table td, .table th {
  border: 1px solid lightgrey;
  width:auto;  
}
.table tr:first-child th {
  border-top: 0;
}

.table tr td:first-child,
.table tr th:first-child {
  border-left: 0;
}
.table tr td:last-child,
.table tr th:last-child {
  border-right: 0;
}

</style>


