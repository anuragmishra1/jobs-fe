<template>
  <div id="app-root">
    <template v-if="isAuthenticated()">
      <v-app>
        <v-main class="page-content">
          <app-toolbar></app-toolbar>
          <v-container fluid>
            <router-view :key="$route.fullPath"></router-view>
          </v-container>
        </v-main>

        <v-snackbar
          timeout="3000"
          top
          right
          :color="snackbar.color"
          v-model="snackbar.show"
        >
          {{ snackbar.text }}
        </v-snackbar>
      </v-app>
    </template>

    <template v-else>
      <v-app>
        <v-main class="page-content">
          <app-toolbar v-if="showToolbar"></app-toolbar>
          <v-container fluid>
            <router-view :key="$route.fullPath"></router-view>
          </v-container>
        </v-main>

        <v-snackbar
          timeout="3000"
          top
          right
          :color="snackbar.color"
          v-model="snackbar.show"
        >
          {{ snackbar.text }}
        </v-snackbar>
      </v-app>
    </template>
  </div>
</template>

<script>
import AppToolbar from "@/components/app-toolbar";

export default {
  components: {
    AppToolbar,
  },
  data: () => ({
    showToolbar: false,
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  }),

  methods: {
    isAuthenticated() {
      this.showToolbar = this.$route.meta.header || false;
      return localStorage.getItem("token");
    },
  },

  mounted() {
    this.$root.$on("SHOW_SNACKBAR", (data) => {
      this.snackbar = {
        show: true,
        text: data.text,
        color: data.color,
      };
    });
  },
};
</script>

<style>
.page-content {
  background-color: rgb(236, 236, 236);
}

.header {
  background-color: lavender;
  color: blue;
}
</style>
