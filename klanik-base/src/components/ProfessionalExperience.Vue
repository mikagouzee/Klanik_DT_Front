<template>
  <div class="PexContainer">
    <h4>Role : {{professionalExperience.position}}</h4>
    <!-- <h4>Role : {{professionalExperience.position}}</h4>Include :
    <input type="checkbox" v-model="professionalExperience.isRelevant" /> -->
    <p>From {{professionalExperience.startDate.substring(0,10)}} till {{professionalExperience.endDate.substring(0,10)}} : {{professionalExperience.customer}}</p>
    <h5>Summary</h5>
    <span v-html="professionalExperience.summary"></span>

    <h5>Details of accomplishments</h5>
    <ul
      v-if="professionalExperience.accomplishments != null && professionalExperience.accomplishments.length"
    >
      <li
        v-for="ac in professionalExperience.accomplishments.filter(x => !x.isDeleted)"
        :key="ac.id"
      >
        {{ac.title}}
        <!-- Include :
        <input type="checkbox" v-model="ac.isRelevant" /> -->
        <button @click="removeFromList(ac, professionalExperience.accomplishments)">X</button>
      </li>
    </ul>

    <label>Other accomplishment :</label>
    <ckeditor :editor="editor" v-model="otherAccomplishment.title" :config="editorConfig"></ckeditor>

    <button @click="addToList(otherAccomplishment, professionalExperience.accomplishments)">Add</button>

    <h5>Technical Environment</h5>
    <ul
      v-if="professionalExperience.technicalEnvironments != null && professionalExperience.technicalEnvironments.length"
    >
      <li
        v-for="te in professionalExperience.technicalEnvironments.filter(x => !x.isDeleted)"
        :key="te.id"
      >
        {{te.name}}
        <!-- Include :
        <input type="checkbox" v-model="te.isRelevant" /> -->
        <button @click="removeFromList(te, professionalExperience.technicalEnvironments)">X</button>
      </li>
    </ul>

    <label>Other technical environment :</label>

    <ckeditor :editor="editor" v-model="otherTechnical.name" :config="editorConfig"></ckeditor>
    <button @click="addToList(otherTechnical, professionalExperience.technicalEnvironments)">Add</button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "professionalExperience",
  props: ["professionalExperience"],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["bold", "italic", "bulletedList", "numberedList"],
        placeholder: "Summary"
      },
      otherTechnical: {
        id: "",
        isRelevant: true,
        isDeleted: false
      },
      otherAccomplishment: {
        id: "",
        isRelevant: true,
        isDeleted: false
      }
    };
  },
  methods: {
    addToList(value, list) {
      console.log(value);
      
      list.push(value);
    },
    removeFromList: function(value, list) {
      if (list.indexOf(value) > -1) {
        this.markAsDeleted(value);
      }
    },
    markAsDeleted: function(value) {
      value.isDeleted = true;
    }
  },
  watch: {
    "professionalExperience.accomplishments"(newVal) {
      this.otherAccomplishment = {
        id: "",
        isRelevant: true,
        isDeleted: false
      };
    },
    "professionalExperience.technicalEnvironments"(newVal) {
      this.otherTechnical = {
        id: "",
        isRelevant: true,
        isDeleted: false
      };
    }
  }
};
</script>

<style >
.PexContainer {
  border: 1px dashed grey;
  padding: 1px;
  margin: 3px;
}
</style>
