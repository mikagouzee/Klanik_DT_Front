<template>
  <div class="registration">
    <div v-if="!isRegistered" class="box-registerForm">
      <!-- <label>Username :</label>
      <input class="form-control" v-model="username" type="text" placeholder="UserName" />
      <label>First name :</label>
      <input class="form-control" v-model="firstName" type="text" placeholder="First Name" />
      <label>Last name :</label>
      <input class="form-control" v-model="lastName" type="text" placeholder="Last Name" /> -->
      <label>Email :</label>
      <input class="form-control" v-model="email" type="email" placeholder="E-Mail" />
      <label>Password :</label>
      <input class="form-control" v-model="password" type="password" placeholder="Password" />
      <label>Confirm password :</label>
      <input
        class="form-control"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm your password"
      />
      <label>Code*</label>
      <input type="text"  class="form-control" v-model="sixgram" pattern="[A-Za-z]{3}-[A-Za-z]{3}-[A-Za-z]{3}" v-mask="'AAA-AAA-AAA'"/>
      <span
        v-if="email.length && confirmPassword.length && !isPasswordCorrectlyConfirmed"
        style="color:red;"
      >Password incorrectly confirmed.</span>

      <b-button variant="success" @click="register">Register me</b-button>
    </div>
    <div>
      <transition name="hint" appear>
        <div v-if="passwordValidation.errors.length > 0 " class="hints">
          <h3>Password policies </h3>
          <p v-for="error in passwordValidation.errors" v-bind:key="error">{{error}}</p>
        </div>
      </transition>
    </div>
    <div v-if="isRegistered">We have send you a mail to confirm you address. Please check your inbox</div>

    <div v-if="errorMessage" class="error-message">{{errorMessage}}</div>
  </div>
</template>

<script>
import authenticationService from "@/services/AuthenticationService";
export default {
  name: "register",
  components: {},
  data() {
    return {
      rules: [
        { message: "One lowercase letter required.", regex: /[a-z]+/ },
        { message: "One uppercase letter required.", regex: /[A-Z]+/ },
        { message: "6 characters minimum.", regex: /.{6,}/ },
        { message: "One number required.", regex: /[0-9]+/ },
        { message: "At least one non alphanumeric", regex: /[^a-zA-Z\d\s:]/}
      ],
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      sixgram : "",
      isRegistered: false,
      errorMessage: ""
    };
  },
  computed: {
    registerModel() {
      return {
        username: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        sixgram : this.sixgram
      };
    },
    isPasswordCorrectlyConfirmed() {
      return this.password == this.confirmPassword;
    },
    loginModel() {
      return {
        username: this.registerModel.username,
        password: this.registerModel.password
      };
    },
    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    }
  },
  watch: {},
  methods: {
    register() {
      authenticationService
        .register(this.registerModel)
        .then(
          res => {
            console.log(res);
             this.isRegistered = true;
          }
        )
        .catch(err => {
          if (typeof err == typeof []) {
            var msg = "";
            err.response.data.forEach(error => {
              msg += error.description;
              msg += "\n";
            });
            this.$toastr("error", msg, "");
          }
        });
    }
  }
};
</script>

<style>
.registration {
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.box-registerForm {
  grid-column: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 15px;
}

</style>
