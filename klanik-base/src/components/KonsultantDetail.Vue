<template>
  <div class="container">
    <div class="buttonBox">
          <button @click="getPdf">Pdf</button>
          <button @click="edit">Edit</button>
          <button @click="log">Log</button>
    </div>

    <div class="pdf" v-if="pdf">
      <iframe id="cv-pdf" :src="cvPdf"/>
    </div>

    <div class="CV" v-if="!pdf && ready && konsultant != null">
          <section class="box-header">

              <div class="Klanik-logo">
                <img src="../assets/pictos/logo1.png" alt="logo" class="logo">
              </div>

              <div class="box-infos">
                <div class="box-name">{{konsultant.name}} {{konsultant.surname}}</div>

                <div class="box-summary">
                  {{konsultant.function}}
                  <br>
                  {{mainCompetence}}
                  <br>

                  Available starting {{konsultant.availability.substring(0,10)}}
                </div>
              </div>

              <div class="Klanik-titleBar">
                Klanik Consulting
              </div>
          </section>

          <section class="row-competences">
                  <div class="section-title">
                          <img src="../assets/pictos/competence.png" alt="comp-icon" align="top"> <h2> Competences</h2>
                  </div>
                  <div class="section-content">
                      <div class="box-competences" >

                        <table class="skillTable1">
                          <tr v-for="thiscomp in firstHalfSkill" :key="thiscomp.name">
                            <td class="skill">{{thiscomp.name}}</td>
                            <td class="skill">{{thiscomp.rating}}</td>
                          </tr>
                        </table>

                        <table class="skillTable2">
                            <tr v-for="thatcomp in secondHalfSkill" :key="thatcomp.name">
                            <td class="skill">{{thatcomp.name}}</td>
                            <td class="skill">{{thatcomp.rating}}</td>
                          </tr>
                        </table>

                      </div>

                      <div class="box-languages">
                              <!-- <h3> Languages</h3> -->
                              <table class="table">
                              <tr v-for="lang in konsultant.languages.filter(l => l.isRelevant)" :key="lang.name">
                                  <td class="table">{{lang.name}}</td>
                                  <td class="table">{{lang.fluency}}</td>
                              </tr>
                              </table>
                        </div>

                      <div class="box-legend">
                          « I have some competences <br>
                          «« I know how to do but I need support <br>
                          ««« Good level <br>
                          «««« Very good level / mastering the topic <br>
                          ««««« Subject Matter Expert
                      </div>

                  </div>

          </section>

          <section class="row-education">
              <div class="section-title">
                      <img src="../assets/pictos/education.png" alt="edu-icon"><h2>Education</h2>
              </div>
              <div class="section-content">
                  <table>
                      <tr v-for="edu in konsultant.educations.filter(e => e.isRelevant)" :key="edu.name">
                          <td>{{edu.startDate.substring(0,10)}} to {{edu.endDate.substring(0,10)}} </td>
                          <td>{{edu.name}}</td>
                      </tr>
                  </table>
              </div>
          </section>

          <section class="row-certificate">
              <div class="section-title">
                  <img src="../assets/pictos/certificate.png" alt="cert-icon"><h2>Certificates/Clearance</h2>
              </div>
              <div class="section-content">
                  <table>
                          <tr v-for="cert in konsultant.certificates.filter(c => c.isRelevant)" :key="cert.name">
                              <td>{{cert.obtension.substring(0,10)}} </td>
                              <td>{{cert.name}}</td>
                          </tr>
                  </table>
              </div>
          </section>

          <section class="row-summary">
              <div class="section-title">
                      <img src="../assets/pictos/summary.png" alt="sum-icon"><h2>Summary of Professional Experiences</h2>
              </div>
              <div class="section-content">
                      <table>
                          <tr >
                              <td class="table table-header">From month/year till month/year </td> <td class="table-header"> Company </td> <td class="table-header">Position</td>
                          </tr>
                          <tr v-for="prof in konsultant.professionalExperiences.filter(p => p.isRelevant)" :key="prof.position">
                              <td class="table">From {{prof.startDate.substring(0,10)}} to {{prof.endDate.substring(0,10)}} </td>
                              <td class="table">{{prof.customer}} </td>
                              <td class="table"> {{prof.position}}</td>
                          </tr>
                      </table>
              </div>
          </section>

          <section class="row-experience">
              <div class="section-title">
                      <img src="../assets/pictos/experience.png" alt="exp-icon"><h2>Professional Experiences</h2>
              </div>
              <div class="section-content">
                  <ul>
                          <li v-for="(prof, index) in konsultant.professionalExperiences.filter(p => p.isRelevant)" :key="index">
                              From {{prof.startDate.substring(0,10)}} till {{prof.endDate.substring(0,10)}} : {{prof.customer}}<br>
                              Role : {{prof.position}}<br>
                              {{prof.summary}}<br>
                              <h5>Details of Accomplishments :</h5>
                              <ul>
                              <li v-for="(accomp, index) in prof.accomplishments.filter(a => a.isRelevant)" :key="index">--{{accomp.title}}</li>
                              </ul>

                              <h5>Technical Environment :</h5>
                              <ul>
                              <li v-for="(tech, index) in prof.technicalEnvironments.filter(t => t.isRelevant)" :key="index">
                                  --{{tech.name}} {{tech.option}}
                              </li>
                              </ul>
                          </li>
                          </ul>
              </div>
          </section>

          <section class="row-reference">
              <div class="section-title">
                      <img src="../assets/pictos/reference.png" alt="ref-icon"><h2>Professional References</h2>
              </div>
              <div class="section-content">
                      <ul>
                          <li v-for="refer in konsultant.professionalReferences" :key="refer.id">{{refer.surname}} , {{refer.name}}, {{refer.function}}, {{refer.mail}}, {{refer.phone}}</li>
                      </ul>
              </div>
          </section>

    </div>

  </div>
</template>

<script>
import klanikApi from "@/services/KlanikService";

import pdf from "pdfvuer";

export default {
  name: "konsultantDetail",
  components: {
    pdf
  },
  data() {
    return {
      ready: false,
      konsultant: null,
      pdf:null,
      cvPdf:''
      //location:''
    };
  },
  async created() {
    this.konsultant = await this.getKonsultantById(this.$route.params.konsultantId);

    this.$store.dispatch('SelectKonsultant', this.konsultant);
    // console.log("Konsultant Detail : ");
    // console.log(JSON.stringify(this.konsultant, null, 4));
  },
  methods: {
    log(){
      console.log(JSON.stringify(this.konsultant, null, 4));
    },

    async getKonsultantById(id) {
      try {
        if(this.$store.getters.selectedKonsultant!=null
         && Object.keys(this.$store.getters.selectedKonsultant).length
         && this.$store.getters.selectedKonsultant.id == id){
          console.log("Detail using store konsultant");
          return this.$store.getters.selectedKonsultant;
        }
        else{
          return await klanikApi.getKonsultantById(id);
        }
      } finally {
        this.ready = true;
      }
    },

    async getPdf() {
      console.log("Getting PDF Cv");

      this.ready = false;

     try {
       var newId = await klanikApi.createKonsultant(this.konsultant)
      return await klanikApi.getCvAsPdf(newId)
        .then(r =>{
          this.cvPdf = "data:application/pdf;base64,"+r;
            // console.log(r);
          }  );
      } finally {
        this.ready = true;
        this.pdf = true;
      }
    },

    edit(){
      this.$router.push({name:'konsultantEdition', params:{konsultantId:this.$route.params.konsultantId}});
    }
  },
  computed:{
    mainCompetence(){
      if (this.konsultant.competences.length > 0)
        return this.konsultant.competences[0].name;
    },
    competenceList(){
      let relevantSkills = [];

      for(let i = 0; i < this.konsultant.competences.length; i++){
        if(this.konsultant.competences[i].isRelevant){
          relevantSkills.push(this.konsultant.competences[i]);
        }
      }
      return relevantSkills;
    },
    firstHalfSkill(){
      let firstHalf = [];

      for(let i= 0; i < Math.round(this.competenceList.length/2); i++){
        firstHalf.push(this.competenceList[i]);
      }

      return firstHalf;
    },
    secondHalfSkill(){
      let secondHalf = [];

      for(let i= Math.round(this.competenceList.length/2); i < this.competenceList.length; i++){
        //console.log(JSON.stringify(this.konsultant.competences[i], null, 4));
        secondHalf.push(this.competenceList[i]);
      }

      //console.log(JSON.stringify(secondHalf, null, 4));

      return secondHalf;
    }
  }
};
</script>

<style>

iframe{
  width:1200px;
  height:22000px;
}

.footer{
  display:grid;
  grid-template-columns: 30% 50% 20%;
  margin-left:50px;
  page-break-after: always;
  break-after:always;
  color:white;
}

.PSA{
  grid-column: 1;
  background-color: #304d6f;
}

.contact{
  grid-column:2;
  background-color:#4d7dad;
}

.pageNumber{
  grid-column:3;
  justify-self: stretch;
  text-align:right;
  background-color:#041d36;
  background-clip:content-box;
}

.header{
  display:grid;
  align-content: center;
  justify-self: center;
}
.header img{
  max-height: 100px;
}

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
    display:grid;
    font-family:Titillium
}

.logo{
  width:100%;
  height:100%;
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
  grid-row: 1;

  display:grid;
  grid-template-columns: 50% 50%;

  justify-self: stretch;
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

    text-align:center;
}

.skillTable2 {
    grid-column:2;
    border-collapse: separate;
    border-spacing: 5px 1px;
    margin-right: 25px;

    text-align:center;
}

.box-languages{
  margin-left:25px;
  grid-column: 1;
  grid-row:2;
  justify-self: stretch;
}

.box-legend{
  grid-column:2;
  grid-row:2;
}

.table-header{
  background-color:#1d3652;
  color:white;
  margin:5px;
  padding:5px;
  font-style: bold;
}

.box-header{
    display:grid;
    grid-template-columns:30% 70%;
    grid-template-rows:55% 45%;
    /* border:1px solid black; */
}

.Klanik-logo{
  grid-column:1;
  grid-row:1/ span 2;
  z-index:1;
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

}

.box-infos{

    grid-column:2;
    grid-row:1;
    display:grid;
    grid-template-columns: 50% 50%;

    align-content: center;
    font-family:Titillium-title;
}

.box-name{
  grid-column:1;
  margin-top:auto;
  margin-bottom:auto;
  font-size:150%;
  /* border:1px solid black; */
}

.box-summary{
  /* border:1px green dashed; */
    grid-column:2;
    justify-self:stretch;
    font-size:125%;
    /* border:1px solid black; */
}

.table {
  border-collapse: collapse;
  padding:5px;
  /* height:100%;
  width:100%; */
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
