<template>
  <v-app id="login">
    <v-main class="login-panel">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card class="form-card">
            <v-card-title class="login-header"> Admin Panel </v-card-title>
            <v-card-text class="loginForm">
              <v-form v-model="isFormValid" ref="loginForm">
                <v-row cols="12">
                  <v-text-field
                    v-model.trim="loginData.email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-row>
                <v-row cols="12">
                  <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'"
                    v-model.trim="loginData.password"
                    label="Password"
                    @keyup.enter="doLogin"
                    @click:append="showPassword = !showPassword"
                  >
                  </v-text-field>
                </v-row>
              </v-form>
              <v-layout>
                <v-flex sm12>
                  <v-btn
                    color="primary"
                    block
                    @click="doLogin"
                    :disabled="!isFormValid"
                    >LOGIN</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { userAPI } from "@/services";

export default {
  data() {
    return {
      loginData: {},
      emailRules: [(v) => !!v || "Email is required"],
      rules: {
        required: (value) => !!value || "Password is Required.",
      },
      e1: true,
      disabled: true,
      isFormValid: false,
      showMessage: "",
      showPassword: false,
    };
  },

  methods: {
    async doLogin() {
      try {
        let res = await userAPI.login(this.loginData);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userDetail", JSON.stringify(res.data));

        this.$router.push("/jobs");
        this.$root.$emit("SHOW_SNACKBAR", {
          text: "You are successfully logged in",
          color: "success",
        });
      } catch (error) {
        let data = error.data || {};
        this.$root.$emit("SHOW_SNACKBAR", {
          text: data.message || data.error || "Something went wrong",
          color: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-panel {
  /* background-image: url(../../assets/images/didpanel.jpg);
  background-attachment: fixed;
  background-size: cover; */
  background-color: lavender;
}

.login-panel .form-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  width: 330px;
  padding: 5px 20px;
  /* margin-top: 10%; */
}

.login-header {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
  color: dodgerblue;
  display: block;
}

.loginForm {
  background-color: #fff;
}
</style>
