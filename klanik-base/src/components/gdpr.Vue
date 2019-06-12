<template>
  <div class="mainBlock">
    <div></div>
    <div>
      <h1>General Data Protection Regulation (GDPR)</h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare felis feugiat orci commodo, non ultrices diam scelerisque. Maecenas ac semper massa, blandit sagittis nibh. Sed cursus vestibulum accumsan. Aliquam vitae augue gravida, hendrerit urna ac, tincidunt arcu. Sed vehicula quis dui sed tincidunt. Nullam mattis dictum odio. Curabitur feugiat diam vel neque maximus, vehicula lacinia massa sollicitudin. Nulla commodo hendrerit libero, eu dapibus nunc semper non.
      Donec varius id est non dictum. Nam sit amet lectus et enim sollicitudin porta. Curabitur nec metus semper, egestas metus quis, varius velit. Mauris vel lacus ut dolor fringilla aliquet eu eu urna. Proin eget sapien in mauris laoreet tempor eget sit amet leo. Phasellus venenatis augue diam, at consectetur tortor posuere et. Vestibulum luctus sagittis quam, non porttitor magna imperdiet id. Ut non risus ut velit eleifend scelerisque nec ut felis. Aenean felis lacus, mollis a ultrices ut, pharetra et arcu. Mauris tincidunt mi in justo euismod pretium. Phasellus pulvinar odio non felis ultrices aliquet. Quisque convallis ex non tellus vulputate, nec facilisis massa mattis. Maecenas augue enim, iaculis quis tortor ac, facilisis mattis urna.
      Pellentesque ac viverra lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Etiam scelerisque dictum lectus, et mattis augue consequat sit amet. Sed nec ligula vestibulum, lobortis libero a, volutpat neque. Phasellus rhoncus vel est finibus vestibulum. Morbi fringilla tortor eget neque tristique, quis rutrum ligula fermentum. Mauris sed mattis risus, sed sollicitudin magna. Nam ex leo, pretium vitae convallis sit amet, elementum eget nisl.
      Proin venenatis nec mauris et tincidunt. Aliquam dapibus neque et faucibus ullamcorper. Duis blandit urna at viverra semper. Nullam in feugiat nisi. Pellentesque sit amet sem quis arcu vehicula vulputate ac nec nulla. Cras aliquam ex eget enim semper suscipit. Sed vel enim libero. Praesent accumsan fermentum ipsum, in aliquam ipsum semper non. Integer finibus malesuada consectetur. Phasellus vulputate nisi ac cursus cursus. Cras justo nulla, tristique eu cursus non, luctus eget est. Cras dapibus interdum magna, a imperdiet elit hendrerit nec. Vivamus fermentum consectetur enim, et ornare odio scelerisque nec. Suspendisse massa lectus, lobortis et feugiat vel, tempor vel enim. Duis molestie tristique ante sed scelerisque.
      Vivamus semper felis et mi elementum congue. Cras rutrum, massa eget convallis efficitur, enim diam consequat purus, at pulvinar velit nisl ornare tellus. Aenean ac ex sem. Praesent porttitor condimentum dui, et fringilla purus interdum eget. Nullam turpis diam, bibendum quis turpis nec, ullamcorper rutrum eros. Ut egestas, lacus ut vehicula tristique, ipsum ligula mattis purus, eu volutpat dolor mi sed tellus. Vestibulum venenatis mi lacus, a sodales massa volutpat id. Nam vitae sem et justo facilisis facilisis at quis lorem. Fusce quis elit vel libero dapibus congue. Donec vel nisl mollis, mollis diam eget, bibendum urna. Vestibulum eleifend non erat ut vulputate.
    </div>
    <div></div>
    <div></div>

    <div>
      <input
        type="checkbox"
        name="gprdOptIn"
        id="gprdOptIn"
        v-model="OptedIn"
        v-on:change="SetOptIn()"
      >
      OptIn : {{OptedIn}}
    </div>
    <div></div>
  </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";

export default {
  name: "gdpr",
  component: {},

  data() {
    return {
      OptedIn: this.$store.getters.GetOptIn
    };
  },
  methods: {
    async SetOptIn() {
        console.log(this.OptedIn);
      await this.$store.dispatch("SetOptIn", this.OptedIn);
      console.log(this.$store.getters.GetOptIn);
      return await authenticationService.updateOptIn(
        this.$store.getters.currentUser.sub,
        this.$store.getters.GetOptIn
      );
    }
  }
};
</script>

<style>
.mainBlock {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 5 px;
  grid-row-gap: 15px;
}
</style>
