<template>
<body class="container">
  <div class="CV">
    <div class="box-header">
      <div class="Klanik-logo">This is the logo</div>

      <div class="Klanik-titleBar">Klanik Consulting</div>

      <div class="box-infos">
        <div class="box-name">{{konsultant.name}} {{konsultant.surname}}</div>

        <div class="box-summary">
          {{konsultant.function}}
          <br>
          {{konsultant.competences[0].name}}
          <br>
          Available starting {{konsultant.availability}}
        </div>
      </div>
    </div>

    <div class="box-competences">
      <h2>Competences</h2>
      <table>
        <tr v-for="comp in konsultant.competences" :key="comp.competence.name">
          <td>{{comp.competence.name}}</td>
          <td>{{comp.rating}}</td>
        </tr>
      </table>
    </div>

    <div class="languages">
      <h2>Languages</h2>
      <table>
        <tr v-for="lang in konsultant.languages" :key="lang.language.id">
          <td>{{lang.language.name}}</td>
          <td>{{lang.fluency}}</td>
        </tr>
      </table>
    </div>

    <div class="box-education">
      <h2>Education</h2>
      <table>
        <tr v-for="edu in konsultant.educations" :key="edu.education.name">
          <td>{{edu.startDate}} to {{edu.endDate}}</td>
          <td>{{edu.education.name}}</td>
        </tr>
      </table>
    </div>

    <div class="box-certificate">
      <h2>Certificates/Clearance</h2>
      <table>
        <tr v-for="cert in konsultant.certificates" :key="cert.certificate.name">
          <td>{{cert.obtensiion}}</td>
          <td>{{cert.certificate.name}}</td>
        </tr>
      </table>
    </div>

    <!-- <div class="box-experience-summary">
          <h2>Summary of Professional Experiences</h2>
          <ul>
            <li>From {{prof.startDate}} to {{prof.endDate}} : {{prof.customer}} as {{prof.position}}</li>
          </ul>
        </div>

        <div class="box-experience">
          <h2>Professional Experiences</h2>
          <ul>
            <li>
              From {{prof.startDate}} till {{prof.endDate}} : {{prof.customer}}
              Role : {{prof.position}}
              {{prof.summary}}"
              Details of Accomplishments :
              --{{accomp.title}} : {{accomp.summary}}
              Technical Environment
              --{{tech.name}} {{tech.option}}
            </li>
          </ul>
        </div>

        <div class="box-reference">
          <h2>Professional References</h2>
          <ul>
            <li>{{refer.surname}} , {{refer.name}}, {{refer.function}}, {{refer.contacts.mail}}, {{refer.contacts.phone}}</li>
          </ul>
    </div>-->
  </div>
</body>
</template>

<script>
import professionalExperience from "./ProfessionalExperience";

export default {
  name: "pdfPreview",
  props: ["konsultant"],
  components: {
    Professional: professionalExperience
  },
  data() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>



<style >
.container {
  display: grid;
}

.box-header {
  display: inline-grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 50% 50%;
}

.Klanik-logo {
  grid-column: 1;
  grid-row: 1 / span 2;

  background-color: yellow;
}

.Klanik-titleBar {
  grid-column: 1 / span 2;
  grid-row: 2;

  background-color: grey;
}

.box-infos {
  grid-column: 2;
  grid-row: 1;
  text-align: right;
}
</style>

