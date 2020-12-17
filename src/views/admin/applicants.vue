<template>
  <div>
    <v-btn small color="primary" to="/jobs">
      <v-icon>keyboard_backspace</v-icon>
      Go To Job List
    </v-btn>

    <v-row>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-card elevation="2">
          <v-card-title style="color: blue">Applicants</v-card-title>
          <v-list>
            <template v-for="(item, index) in applicantList">
              <v-list-item
                :key="index"
                @click="getApplicantDetail(item._id)"
                :class="{ active: item._id === selectedApplicantId }"
              >
                <v-list-item-icon>
                  <v-icon color="indigo"> person </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }} ({{ item.email }})
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ item.phone }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon v-if="item._id === selectedApplicantId">
                  <v-icon large color="blue">keyboard_arrow_right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider :key="`${index}-${item.title}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8" md="8" sm="12">
        <v-card elevation="2">
          <v-card-title style="color: blue">Resume</v-card-title>

          <v-card-text id="resume"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import { applicantAPI } from "@/services";

export default {
  data: () => ({
    moment: moment,
    applicantList: [],
    applicantDetail: {},
    selectedApplicantId: "",
  }),

  methods: {
    async getApplicantList() {
      let jobId = this.$route.params.id;
      try {
        let response = await applicantAPI.getApplicants(jobId);
        this.applicantList = response.data;
        if (this.applicantList.length > 0) {
          this.getApplicantDetail(this.applicantList[0]._id, jobId);
        }
      } catch (error) {
        console.log("====error===", error);
      }
    },

    async getApplicantDetail(applicantId) {
      let jobId = this.$route.params.id;
      this.selectedApplicantId = applicantId;
      try {
        let response = await applicantAPI.getApplicantDetail(
          jobId,
          applicantId
        );
        this.applicantDetail = response.data;

        const el = document.getElementById("resume");
        el.innerHTML = "";
        let obj = document.createElement("object");
        obj.style.width = "100%";
        obj.style.height = "842pt";
        obj.type = "application/pdf";
        obj.data = "data:application/pdf;base64," + this.applicantDetail.resume;
        el.appendChild(obj);
      } catch (error) {
        console.log("====error===", error);
      }
    },
  },

  mounted() {
    this.getApplicantList();
  },
};
</script>

<style scoped>
#resume-canvas {
  border: 1px solid black;
  direction: ltr;
}

.active {
  background-color: lavender;
}
</style>
