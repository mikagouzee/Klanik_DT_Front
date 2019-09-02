<template>
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
      <md-button class="md-raised" @click="addToList(newCompetence, konsultant.competences, 2)">Add</md-button>
      <div class="box box-legend">
        &#9733; I have some competences
        <br />&#9733;&#9733; I know how to do but I need support
        <br />&#9733;&#9733;&#9733; Good level
        <br />&#9733;&#9733;&#9733;&#9733; Very good level / mastering the topic
        <br />&#9733;&#9733;&#9733;&#9733;&#9733; Subject Matter Expert
      </div>
    </div>
    <!-- <span>{{ratingmsg}}</span> -->
    <!-- <div class="existing">
      <table class="skillTable1">
        <tr v-for="thiscomp in firstHalfSkill.filter(x => !x.isDeleted)" :key="thiscomp.name">
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
        <tr v-for="thatcomp in secondHalfSkill.filter(x => !x.isDeleted)" :key="thatcomp.name">
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
    </div>-->
  </div>
</template>

<script>
import KlanikApi from "@/services/KlanikService";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      availablecompetences: [],
      isLoading: false,

      newCompetence: {
        isRelevant: true
      }
    };
  },
  mounted() {
    KlanikApi.GetAllCompStartingBy("").then(c => {
      c.data.forEach(element => {
        this.availablecompetences.push(element.name);
      });
    });
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
    }
  }
};
</script>

<style>
</style>