<template>
  <div id="app-root">
    <template>
      <v-app>
        <v-main class="page-content">
          <!-- Header toolbar -->
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
    <!-- <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>

          <v-snackbar
            timeout="3000"
            top
            right
            :color="snackbar.color"
            v-model="snackbar.show"
          >
            {{ snackbar.text }}
          </v-snackbar>
        </keep-alive>
      </transition>
    </template> -->
  </div>
</template>

<script>
import AppToolbar from "@/components/app-toolbar";

export default {
  components: {
    AppToolbar,
  },
  data: () => ({
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  }),

  methods: {
    isAuthenticated() {
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
</style>
