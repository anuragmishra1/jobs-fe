<template>
  <v-app-bar color="deep-purple accent-4" dense dark app>
    <v-toolbar-title @click="goToHome" style="cursor: pointer">
      FLY HIRE
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn small color="primary" to="/jobs" v-if="isAuthenticated">
      <v-icon>keyboard_backspace</v-icon>
      Go To Job List
    </v-btn>

    <v-btn icon v-if="isAuthenticated">
      <v-icon @click="logout">power_settings_new</v-icon>
    </v-btn>

    <v-btn icon v-if="!isAuthenticated">
      <v-icon @click="goToLogin">login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    isAuthenticated: false,
  }),

  methods: {
    logout() {
      localStorage.clear();
      this.isAuthenticated = false;
      this.$router.push("/");
    },

    goToHome() {
      this.$router.push("/");
    },

    goToLogin() {
      this.$router.push("/login");
    },

    isLogin() {
      if (localStorage.getItem("token")) {
        this.isAuthenticated = true;
      }
    },
  },

  mounted() {
    this.isLogin();
  },
};
</script>
