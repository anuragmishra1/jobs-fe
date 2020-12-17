<template>
  <v-app-bar color="deep-purple accent-4" dense dark app>
    <v-toolbar-title @click="goToHome" style="cursor: pointer"
      >Good Worker</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn icon v-if="isAuthenticated">
      <v-icon @click="logout">power_settings_new</v-icon>
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
