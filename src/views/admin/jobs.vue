<template>
  <v-card elevation="2">
    <v-card-title class="header">
      Job List
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            fab
            small
            color="primary"
            v-bind="attrs"
            v-on="on"
            to="/job/add"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <span>Add New Job</span>
      </v-tooltip>
    </v-card-title>

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

      <template v-slot:[`item.company_name`]="{ item }">
        <a :href="item.company_website" target="_blank">{{
          item.company_name
        }}</a>
      </template>

      <template v-slot:[`item.technologies`]="{ item }">
        <v-chip
          class="ma-1"
          color="primary"
          v-for="name in item.technologies"
          :key="name"
          >{{ name }}</v-chip
        >
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ moment(item.createdAt).format("MMM Do YYYY, h:mm:ss a") }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="viewJobApplicant(item._id)"
              >visibility</v-icon
            >
          </template>
          <span>View list of applicants</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="editJob(item._id)"
              >edit</v-icon
            >
          </template>
          <span>Edit Job</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="removeJob(item._id)"
              >delete</v-icon
            >
          </template>
          <span>Remove Job</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";
import { jobAPI } from "@/services";

export default {
  data: () => ({
    moment: moment,
    options: {},
    loading: false,
    headers: [
      {
        text: "#",
        value: "indexNo",
        sortable: false,
      },
      {
        text: "Job Title",
        value: "title",
        align: "center",
        sortable: false,
      },
      {
        text: "Company Name",
        value: "company_name",
        align: "center",
        sortable: false,
      },
      {
        text: "Location",
        value: "location",
        align: "center",
        sortable: false,
      },
      {
        text: "Technologies",
        value: "technologies",
        align: "center",
        sortable: false,
      },
      {
        text: "Created On",
        value: "createdAt",
        align: "center",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    totalJobs: 0,
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
