<template>
  <v-card elevation="2">
    <v-row> </v-row>
    <v-card-title>Jobs</v-card-title>
    <!-- <v-row>
      <v-col cols="12" lg="4">
        <v-card-title>Job List </v-card-title>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="jobList"
      :server-items-length="totalJobs"
      :options.sync="options"
      :loading="loading"
    >
      <template v-slot:[`item.indexNo`]="{ item }">
        {{
          (options.page - 1) * options.itemsPerPage +
          (jobList.indexOf(item) + 1)
        }}
      </template>
      <template v-slot:[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:[`item.location`]="{ item }">
        {{ item.location }}
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a") }}
      </template>
      <template v-slot:[`item.grandTotal`]="{ item }">
        ${{ item.grandTotal }}
      </template>
      <template v-slot:[`item.viewAction`]>
        <v-icon>visibility</v-icon>
      </template>
    </v-data-table> -->
    <v-list>
      <template v-for="(item, index) in jobList">
        <v-list-item :key="index">
          <v-list-item-avatar>
            <v-img :src="`data:image/png;base64,${item.company_logo}`"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle
              ><a :href="item.company_website">{{ item.company_name }}</a
              >, {{ item.location }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>{{
              item.about_company
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
// import moment from "moment";
import { jobAPI } from "@/services";

export default {
  data: () => ({
    // moment: moment,
    // options: {},
    // loading: false,
    // totalJobs: 0,
    // headers: [
    //   {
    //     text: "#",
    //     value: "indexNo",
    //     sortable: false,
    //   },
    //   {
    //     text: "Title",
    //     value: "title",
    //     align: "center",
    //     sortable: false,
    //   },
    //   {
    //     text: "Location",
    //     value: "location",
    //     align: "center",
    //     sortable: false,
    //   },
    //   {
    //     text: "Created On",
    //     value: "createdAt",
    //     align: "center",
    //     sortable: false,
    //   },
    //   {
    //     text: "Action",
    //     value: "action",
    //     align: "center",
    //     sortable: false,
    //   },
    // ],
    jobList: [],
  }),

  watch: {
    options: {
      handler() {
        this.getJobList();
      },
      deep: true,
    },
  },

  methods: {
    async getJobList() {
      this.loading = true;
      //   const { page, itemsPerPage } = this.options;
      try {
        let response = await jobAPI.getJobs();
        this.totalJobs = response.data.length;
        this.jobList = response.data;
        this.loading = false;
      } catch (error) {
        console.log("====error===", error);
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getJobList();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
