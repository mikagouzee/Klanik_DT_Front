<template>
<div class="hello">
    <h1>Welcome to Klanik , dear {{user.given_name}} </h1>
    <p>
        Cette page web a pour but de vous permettre d'enregistrer les informations liées à votre CV,
        afin de générer le Dossier Technique (DT) utilisé par nos collègues pour vous trouver la mission de vos rêves.

        Rassurez vous, nous ne modifions pas vos informations, nous les mettons simplement aux normes de notre charte graphique ;-)

        <gdpr></gdpr>
    </p>
</div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService';
import gdpr from './GDPR'
export default {
    name: 'Home',
    components: {
        gdpr
    },
    data() {
        return {

        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser;
        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
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
