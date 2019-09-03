<template>
  <div class="hello">
    <h1>Welcome to Klanik </h1>
    <p>
      Cette page web a pour but de vous permettre d'enregistrer les informations liées à votre CV,
      afin de générer le Dossier Technique (DT) utilisé par nos collègues pour vous trouver la mission de vos rêves.
      Rassurez vous, nous ne modifions pas vos informations, nous les mettons simplement aux normes de notre charte graphique ;-)
      <b-modal
        title="GDPR Consent form for candidates for the processing of Personal Data"
        size="xl"
        v-if="!HasOptedGDPR"
        id="gdprmodal"
        ok-only
        :cancel-disabled="true"
        :no-close-on-esc="true"
        :no-close-on-backdrop="true"
        :scrollable="true"
      >
        <gdpr v-if="!HasOptedGDPR"></gdpr>
        <template slot="modal-footer" slot-scope="{}">
          <b-button size="sm" variant="outline-secondary" @click="SetOptIn()">Accept</b-button>
        </template>
      </b-modal>
    </p>
  </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";
import gdpr from "./gdpr";
export default {
  name: "Home",
  components: {
    gdpr
  },
  data() {
    return {
         OptedIn: this.$store.getters.GetOptIn
    };
  },
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },

    HasOptedGDPR() {
      return this.$store.getters.GetOptIn;
    }
  },
  created() {},
  mounted() {
    this.$bvModal.show("gdprmodal");
  },
  methods: {
    async SetOptIn() {
      if (typeof this.OptedIn == "undefined") {
        this.OptedIn = false;
      } else {
        this.OptedIn = !this.OptedIn;
      }

      await this.$store.dispatch("SetOptIn", this.OptedIn);
      await authenticationService
        .updateOptIn(
          this.$store.getters.currentUser.sub,
          this.$store.getters.GetOptIn
        )
        .then(() => {
          this.$toastr("success", "GDPR updated", "");
           this.$bvModal.hide("gdprmodal");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h5 {
  color: black;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  text-align: center;
}
</style>
