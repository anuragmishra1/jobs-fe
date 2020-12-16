<template>
  <v-app-bar color="deep-purple accent-4" dense dark app>
    <v-toolbar-title>Good Worker</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="logout">power_settings_new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
