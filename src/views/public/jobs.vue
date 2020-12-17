<template>
  <v-row>
    <v-col cols="12" lg="4" md="4" sm="12">
      <v-card elevation="2">
        <v-card-title style="color: blue">Jobs</v-card-title>
        <v-list>
          <template v-for="(item, index) in jobList">
            <v-list-item
              :key="index"
              @click="getJobDetail(item._id, item.slug)"
              :class="{ active: item._id === selectedJobId }"
            >
              <v-list-item-avatar>
                <v-img
                  :src="`data:image/png;base64,${item.company_logo}`"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle
                  ><a :href="item.company_website" target="_blank">{{
                    item.company_name
                  }}</a
                  >, {{ item.location }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>{{
                  item.about_company
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="`${index}-${item.title}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="12" lg="8" md="8" sm="12">
      <v-card elevation="2">
        <v-card-title style="color: blue">Job Description</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { jobAPI } from "@/services";

export default {
  data: () => ({
    moment: moment,
    jobList: [],
    jobDetail: {},
    selectedJobId: "",
  }),

  methods: {
    async getJobList() {
      try {
        let response = await jobAPI.getJobs();
        this.jobList = response.data;
        if (this.jobList.length > 0) {
          this.getJobDetail(this.jobList[0]._id, this.jobList[0].slug);
        }
      } catch (error) {
        console.log("====error===", error);
      }
    },

    async getJobDetail(id, slug) {
      this.selectedJobId = id;
      try {
        let response = await jobAPI.getJobDetailBySlug(slug);
        console.log("==response===", response);
        this.jobDetail = response.data;
      } catch (error) {
        console.log("====error===", error);
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

.active {
  background-color: lavender;
}
</style>
