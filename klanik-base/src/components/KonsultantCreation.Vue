<template>
  <div class="container">
    <div class="box buttons">
      <button @click="save">Save</button>
      <button v-if="saved" @click="details">See your profile</button>
    </div>
    <h1>Konsultant</h1>

    <div class="cv">
      <section class>
        <div class="Klanik-logo">
          <img src="../assets/pictos/logo1.png" alt="logo" class="logo" />
          <div class>
            <div class="box-name form-group">
              <label>Name :</label>
              <input v-model="konsultant.name" placeholder="Name" class="form-control" />
              <label>Surname :</label>
              <input v-model="konsultant.surname" placeholder="Surname" class="form-control" />
              <label>Function :</label>
              <input v-model="konsultant.function" placeholder="e.g. Director" class="form-control" />
              <label>Availability :</label>
              <input
                v-model="konsultant.availability"
                placeholder="MM-YYYY"
                pattern="[0-9]{2}-[0-9]{4}"
                type="month"
                class="form-control"
              />
              <label>Mobility</label>
              <multiselect
                v-model="konsultant.Mobilites"
                :options="mobilityList"
                :multiple="true"
                placeholder="Type to search"
                track-by="id"
                label="name"
              >
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect>
            </div>
          </div>
        </div>

        <div class="Klanik-titleBar">Klanik Consulting</div>
      </section>

      <section class="box row-competences">
        <div class="section-title">
          <img src="../assets/pictos/competence.png" alt="comp-icon" align="top" />
          <h2>Competences</h2>
        </div>

        <div class="section-content">
          <div class="box box-competences">
            <div class="form-inline">
              <label>Add a competence :</label>
              <multiselect
                v-if="availablecompetences"
                v-model="newCompetence.name"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                :options="availablecompetences"
                :taggable="true"
                @tag="addTag"
                :loading="isLoading"
                :searchable="true"
                :internal-search="false"
                :options-limit="10"
                @search-change="asyncFind"
              ></multiselect>
              <label>Rating :</label>
              <div @mouseleave="showCurrentRating(0)">
                <star-rating
                  @current-rating="showCurrentRating"
                  v-model="newCompetence.rating"
                  active-color="black"
                  :show-rating="false"
                  v-bind:star-size="20"
                ></star-rating>
              </div>
              <md-button
                class="md-raised"
                @click="addToList(newCompetence, konsultant.competences, 2)"
              >Add</md-button>
              <div class="box box-legend">
                &#9733; I have some competences
                <br />&#9733;&#9733; I know how to do but I need support
                <br />&#9733;&#9733;&#9733; Good level
                <br />&#9733;&#9733;&#9733;&#9733; Very good level / mastering the topic
                <br />&#9733;&#9733;&#9733;&#9733;&#9733; Subject Matter Expert
              </div>
            </div>
            <!-- <span>{{ratingmsg}}</span> -->
            <div class="existing">
              <table class="skillTable1">
                <tr
                  v-for="thiscomp in firstHalfSkill.filter(x => !x.isDeleted)"
                  :key="thiscomp.name"
                >
                  <td class="skill">{{thiscomp.name}}</td>
                  <td class="skill">
                    <star-rating
                      v-model="thiscomp.rating"
                      active-color="black"
                      :show-rating="false"
                      v-bind:star-size="10"
                    ></star-rating>
                  </td>
                  <td class="skill">
                    <md-button
                      class="md-icon-button"
                      @click="removeFromList(thiscomp, konsultant.competences)"
                    >
                      <md-icon>remove_circle_outline</md-icon>
                    </md-button>
                  </td>
                </tr>
              </table>

              <table class="skillTable2">
                <tr
                  v-for="thatcomp in secondHalfSkill.filter(x => !x.isDeleted)"
                  :key="thatcomp.name"
                >
                  <td class="skill">{{thatcomp.name}}</td>
                  <td class="skill">
                    <star-rating
                      v-model="thatcomp.rating"
                      active-color="black"
                      :show-rating="false"
                      v-bind:star-size="10"
                    ></star-rating>
                  </td>
                  <td class="skill">
                    <md-button
                      class="md-icon-button"
                      @click="removeFromList(thatcomp, konsultant.competences)"
                    >
                      <md-icon>remove_circle_outline</md-icon>
                    </md-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="box box-languages form-inline">
            <label>Add a language :</label>
            <input v-model="otherLanguage.name" placeholder="e.g. French" />
            <select v-model="otherLanguage.fluency">
              <option value="1">Beginner</option>
              <option value="2">Scholar</option>
              <option value="3">Technical</option>
              <option value="4">Fluent</option>
              <option value="5">Bilingual</option>
            </select>
            <md-button
              class="md-raised"
              @click="addToList(otherLanguage, konsultant.languages, 2)"
            >Add</md-button>
          </div>
          <div class="lngDisplay">
            <md-table>
              <md-table-row
                v-for="l in konsultant.languages.filter(x => !x.isDeleted)"
                :key="l.name"
              >
                <md-table-cell>{{l.name}}</md-table-cell>
                <md-table-cell>{{l.fluency | lngFilter}}</md-table-cell>
                <md-table-cell>
                  <md-button
                    class="md-icon-button"
                    @click="removeFromList(l, konsultant.languages)"
                  >
                    <md-icon>remove_circle_outline</md-icon>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
      </section>

      <section class="box row-education">
        <div class="section-title">
          <img src="../assets/pictos/education.png" alt="edu-icon" />
          <h2>Education</h2>
        </div>

        <div class="section-content">
          <div class="form-inline">
            <label>Add an education</label>
            <input v-model="otherEducation.Finality" placeholder="e.g. Master in computer science" />@
            <input
              v-model="otherEducation.Diploma"
              placeholder="e.g. Université libre de Bruxelles "
            />

            <input
              v-model="otherEducation.startDate"
              placeholder="Starting date"
              type="month"
              pattern="[0-9]{4}"
            />
            <input
              v-model="otherEducation.endDate"
              placeholder="End date"
              type="month"
              pattern="[0-9]{4}"
            />
            <md-button
              class="md-raised"
              @click="addToList(otherEducation, konsultant.educations, 3)"
            >Add</md-button>
          </div>

          <md-table>
            <md-table-row
              v-for="edu in konsultant.educations.filter(x => !x.isDeleted)"
              :key="edu.id"
            >
              <md-table-cell>
                From
                <input :value="edu.startDate" type="month" />
              </md-table-cell>
              <md-table-cell>
                to
                <input :value="edu.endDate" />
              </md-table-cell>
              <md-table-cell>
                <input v-model="edu.name" />
              </md-table-cell>
              <!-- <md-table-cell>
                Include :
                <input type="checkbox" v-model="edu.isRelevant" />
              </md-table-cell> -->
              <md-table-cell>
                <md-button
                  class="md-icon-button"
                  @click="removeFromList(edu, konsultant.educations)"
                >
                  <md-icon>remove_circle_outline</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </section>

      <section class="box row-certificate">
        <div class="section-title">
          <img src="../assets/pictos/certificate.png" alt="cert-icon" />
          <h2>Certificates/Clearance</h2>
        </div>

        <div class="section-content">
          <div class="form-inline">
            <label>Add a certificate :</label>

            <input v-model="otherCertificate.name" placeholder="e.g. Scrum" />
            <input
              v-model="otherCertificate.startDate"
              placeholder="Obtained on (year)"
              type="month"
              pattern="[0-9]{4}"
            />
            <!-- <input v-model="otherCertificate.EndOfValidity" placeholder="End date" type="date" /> -->

            <md-button
              class="md-raised"
              @click="addToList(otherCertificate, konsultant.certificates, 3)"
            >Add</md-button>
          </div>

          <md-table>
            <md-table-row
              class="box-certif"
              v-for="cert in konsultant.certificates.filter(x => !x.isDeleted)"
              :key="cert.id"
            >
              <md-table-cell>
                <input v-model="cert.name" /> obtained on
                <input :value="cert.obtension | toDate" />
              </md-table-cell>

              <md-table-cell>
                Valid until
                <input :value="cert.endOfValidity | toDate" />
              </md-table-cell>

              <!-- <md-table-cell>
                Include
                <input type="checkbox" v-model="cert.isRelevant" />
              </md-table-cell> -->

              <md-table-cell>
                <md-button
                  class="md-icon-button"
                  @click="removeFromList(cert, konsultant.certificates)"
                >
                  <md-icon>remove_circle_outline</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </section>

      <section class="box row-professionalExperience">
        <div class="section-title">
          <img src="../assets/pictos/experience.png" alt="exp-icon" />
          <h2>Professional Experiences</h2>
        </div>

        <div class="section-content">
          <h4>Add Professional Experience</h4>
          <input v-model="otherProfessionalExperience.position" placeholder="Position" />
          <input
            v-model="otherProfessionalExperience.startDate"
            placeholder="MM-YYYY"
            pattern="[0-9]{2}-[0-9]{4}"
            type="month"
          />
          <input
            v-model="otherProfessionalExperience.endDate"
            placeholder="MM-YYYY"
            pattern="[0-9]{2}-[0-9]{4}"
            type="month"
          />
          <input v-model="otherProfessionalExperience.Customer" placeholder="Company" />
          <div id="cke5prof">
            <ckeditor
              :editor="editor"
              v-model="otherProfessionalExperience.summary"
              :config="editorConfig"
            ></ckeditor>
          </div>
          <md-button
            class="md-raised"
            @click="addToList(otherProfessionalExperience, konsultant.professionalExperiences,5)"
          >Add</md-button>
          <br />

          <div
            v-if="konsultant.professionalExperiences!=null && konsultant.professionalExperiences.length"
          >
            <professionalExperience
              v-for="pe in konsultant.professionalExperiences"
              v-bind:key="pe.position"
              v-bind:professionalExperience="pe"
            ></professionalExperience>
          </div>
        </div>
      </section>

      <section class="box row-professionalReference">
        <div class="section-title">
          <img src="../assets/pictos/reference.png" alt="reference-icon" />
          <h2>References</h2>
        </div>

        <div class="section-content box-references">
          <div>
            <span
              style="font-style:italic"
            >NB: by filling in this section, you agree that you have received the permission of the people identified that they may be contacted for reasons relating to your employment.</span>
          </div>
          <div class="refes">
            <input v-model="otherReference.name" placeholder="Name" />
            <input v-model="otherReference.surname" placeholder="Surname" />
            <input v-model="otherReference.function" placeholder="Function" />
            <input v-model="otherReference.mail" placeholder="Mail" type="email" />
            <input v-model="otherReference.phone" placeholder="Phone" type="tel" />
            <input v-model="otherReference.company" placeholder="Company" />
            <md-button
              class="md-raised"
              @click="addToList(otherReference, konsultant.professionalReferences, 6)"
            >Add</md-button>
          </div>

          <ul>
            <li v-for="ref in konsultant.professionalReferences" :key="ref.name">
              {{ref.surname}}, {{ref.name}}, {{ref.function}}, {{ref.mail}}, {{ref.phone}}, {{ref.company}}
              <button
                @click="removeFromList(ref, konsultant.professionalReferences)"
              >X</button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import KlanikApi from "@/services/KlanikService";
import Multiselect from "vue-multiselect";

import professionalExperience from "./ProfessionalExperience";
import { lngFilter } from "../tools/filters";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "konsultantCreation",
  components: {
    professionalExperience: professionalExperience,
    Multiselect
  },
  filters: {
    lngFilter: lngFilter
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["bold", "italic", "bulletedList", "numberedList"],
        placeholder: "Summary"
      },
      isLoading: false,
      ratingmsg: "",
      ready: false,
      availablecompetences: [],
      saved: false,
      currentId: "",

      konsultant: {
        id: "",
        competences: [],
        languages: [],
        educations: [],
        certificates: [],
        professionalExperiences: [],
        professionalReferences: [],
        optIn: false
      },

      newCompetence: {
        isRelevant: true
      },
      otherLanguage: {
        isRelevant: true
      },
      otherEducation: {
        isRelevant: true
      },
      otherCertificate: {
        isRelevant: true
      },
      otherProfessionalExperience: {
        isRelevant: true,
        accomplishments: [],
        technicalEnvironments: []
      },
      otherReference: {},
      mobilityList: [],
      value: []
    };
  },
  mounted() {
    this.konsultant.optIn = this.$store.getters.GetOptIn;
    KlanikApi.GetAllCompStartingBy("").then(c => {
      c.data.forEach(element => {
        this.availablecompetences.push(element.name);
      });
    });
    KlanikApi.GetAllBu().then(bu => {
      bu.data.forEach(b => {
        this.mobilityList.push({ id: b.id, name: b.name });
      });
    });
  },
  computed: {
    otherEducationName: {
      get() {
        return `${this.otherEducation.Diploma} @ ${this.otherEducation.Finality}`;
      }
    },
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
    referencesList() {
      return this.konsultant.professionalReferences;
    },
    firstHalfSkill() {
      let firstHalf = [];

      for (
        let i = 0;
        i < Math.round(this.konsultant.competences.length / 2);
        i++
      ) {
        firstHalf.push(this.konsultant.competences[i]);
      }
      return firstHalf;
    },
    secondHalfSkill() {
      let secondHalf = [];

      for (
        let i = Math.round(this.konsultant.competences.length / 2);
        i < this.konsultant.competences.length;
        i++
      ) {
        secondHalf.push(this.konsultant.competences[i]);
      }
      return secondHalf;
    }
  },
  methods: {
    showCurrentRating: function(rating) {
      switch (rating) {
        case 1:
          this.ratingmsg = "I have some competences";
          break;
        case 2:
          this.ratingmsg = "I know how to do but I need support ";
          break;
        case 3:
          this.ratingmsg = "Good level ";
          break;
        case 4:
          this.ratingmsg = "Very good / mastering the topic ";
          break;
        case 5:
          this.ratingmsg = "Subject Matter Expert";
          break;

        default:
          this.ratingmsg = "";
          break;
      }
    },
    addTag: function(newTag) {
      this.availablecompetences.push(newTag);
      this.newCompetence.name = newTag;
    },
    asyncFind(query) {
      this.isLoading = true;
      console.log(query);
      KlanikApi.GetAllCompStartingBy(query).then(response => {
        this.availablecompetences = [];
        response.data.forEach(element => {
          this.availablecompetences.push(element.name);
          this.isLoading = false;
        });
      });
    },
    async save() {
      if (this.$store.getters.currentUser.role == "SuperUser") {
        this.konsultant.id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
          /[018]/g,
          c =>
            (
              c ^
              (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
      } else {
        this.konsultant.id = this.$store.getters.currentUser.sub;
      }
      await KlanikApi.createKonsultant(this.konsultant).then(
        res => {
          this.saved = true;
          this.currentId = res;
          this.$router.push({
            name: "konsultantDetail",
            params: { konsultantId: this.currentId }
          });
        },
        ko => {}
      );
    },
    details() {
      this.$router.push({
        name: "konsultantDetail",
        params: { konsultantId: this.currentId }
      });
    },
    addToList: function(value, list, expectedlength) {
      if(list==this.konsultant.educations){
        value.name = `${value.Finality}@${value.Diploma}`; 
      }
      if (Object.keys(value).length >= expectedlength) {
        list.push(value);
      }
    },
    removeFromList: function(value, list) {
      if (list.indexOf(value) > -1) list.splice(list.indexOf(value), 1);
    },
    CreatGuid: () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  },
  watch: {
    competenceList() {
      this.newCompetence = {
        isRelevant: true
      };
    },
    languageList() {
      this.otherLanguage = {
        isRelevant: true
      };
    },
    educationList() {
      this.otherEducation = {
        isRelevant: true
      };
    },
    certificatesList() {
      this.otherCertificate = {
        isRelevant: true
      };
    },
    professionalExperienceList() {
      this.otherProfessionalExperience = {
        isRelevant: true,
        accomplishments: [],
        technicalEnvironments: []
      };
      this.otherAccomplishment = {
        isRelevant: true
      };
      this.otherTechnical = {
        isRelevant: true
      };
    },
    referencesList() {
      this.otherReference = {};
    }
  }
};
</script>

<style >
.form-inline > * {
  margin: 5px 3px;
}
input {
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
select {
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.wrapper {
  display: block;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
}
.gridedtable {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.gdtrow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: ghostwhite;
  grid-column-gap: 5px;
}
#cke5prof {
  margin-top: 5px;
}
.ck-editor__editable {
  min-height: 150px;
}
@font-face {
  font-family: "NewJuneBold";
  src: url("../assets/fonts/NewJune-Bold.otf");
}

@font-face {
  font-family: "Titillium";
  src: url("../assets/fonts/TitilliumWeb-Regular.ttf");
}

@font-face {
  font-family: "Titillium-title";
  src: url("../assets/fonts/TitilliumWeb-Bold.ttf");
}

.cv {
  display: inline-grid;
  font-family: Titillium;
  text-align: left;
  border: 1px solid green;
}

.Klanik-titleBar {
  /* grid-column: 2;
  grid-row: 2; */
  font-family: NewJuneBold;
  font-size: 50px;
  background-color: #041d36;
  color: white;
  text-align: right;
  padding: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  align-self: end;
  /* max-height:75px; */
}
.Klanik-logo {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.box-infos {
  padding-top: 5px;
  margin-left: 50px;
  display: grid;
  font-family: Titillium-title;

  /*grid-template-columns: 50% 50%;
  font-family: Titillium-title;

  /* border:1px dashed blue; */
}

.box-name {
  display: grid;
  grid-column-gap: 5px;
  grid-template-columns: 25% 75%;
  margin-bottom: 5px;
}

section {
  padding: 20px;
}

.section-title {
  font-family: "Titillium-Title";
  /* padding-left:5px; */
  display: grid;

  grid-template-columns: 05% 95%;
  align-items: center;
  color: white;
  font-style: bold;
}

.section-title img {
  grid-column: 1;
  height: 60px;
  margin-right: 5px;
  z-index: 1;
  align-self: start;
}

.section-title h2 {
  grid-column: 2;
  text-align: center;
  align-self: end;
  padding: -5px;
  padding-left: 10px;
  background-clip: padding-box;
  background-color: #4d7dad;
}

.section-content {
  margin-left: 50px;
}

.row-competences .section-content {
  display: grid;
  /* grid-template-columns: 50% 50%; */
  grid-template-rows: auto;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  justify-content: stretch;
  align-items: left;
}

.box-competences {
  /* grid-column: 1 / span 2; display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto; */
  justify-self: stretch;
}
.box-languages-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.box-references {
  display: grid;
  grid-template-rows: auto;
}

.formcomp {
  /* grid-column: 1; */
  /* grid-row: 1; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5em;
}
.refes {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0.5em;
}
.form label {
  grid-column: 1;
}
.form input {
  grid-column: 2;
  max-width: auto;
}

.existing {
  grid-column: 1 / span 2;
  grid-row: 2;

  display: grid;
  columns: 50% 50%;
}

td.skill {
  background-color: ghostwhite;
  padding: 3px;
  text-align: center;
}

.skillTable1 {
  grid-column: 1;
  border-collapse: separate;
  border-spacing: 5px 1px;
  margin-right: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
}

.skillTable2 {
  grid-column: 2;
  border-collapse: separate;
  border-spacing: 5px 1px;
  margin-right: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
}

.box-languages {
  grid-column: 1;
  grid-row: 2;
  justify-self: stretch;
}

.table-header {
  background-color: #1d3652;
  color: white;
  margin: 5px;
  padding: 5px;
  font-style: bold;
}

.table {
  border-collapse: collapse;
  padding: 5px;
  height: 100%;
  width: 100%;
  text-align: center;
}
.table td,
.table th {
  border: 1px solid lightgrey;
  width: auto;
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
.lngDisplay {
  display: grid;
  grid-template-columns: 55% 45%;
}
</style>
