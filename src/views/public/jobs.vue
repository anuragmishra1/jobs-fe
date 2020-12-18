<template>
  <div>
    <v-dialog v-model="showDialog" max-width="30%" persistent>
      <v-card flat class="Card-style pa-2">
        <v-card-title style="color: blue; background-color: lavender">
          Apply for {{ jobDetail.title }}
        </v-card-title>
        <v-form lazy-validation class="ma-3">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="applicantData.name"
                :rules="rules.nameValidation"
                label="Full Name"
                prepend-icon="person"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="applicantData.email"
                :rules="rules.emailValidation"
                label="Email"
                prepend-icon="email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="applicantData.phone"
                :rules="rules.phoneValidation"
                label="Phone No."
                prepend-icon="phone"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-text-field
              placeholder="Select Resume"
              @click="pickFile"
              v-model="resumeName"
              prepend-icon="attach_file"
              @click:prepend="pickFile"
              autocomplete="off"
              readonly
            ></v-text-field>
            <input
              type="file"
              accept="application/pdf"
              ref="resume"
              @change="onFilePicked"
              style="display: none"
            />
          </v-row>
        </v-form>

        <v-card-actions>
          <v-row align="center" justify="center" no-gutters>
            <v-btn color="error" class="ma-2" @click="showDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="primary" @click="applyForJob" class="ma-2"
              >Apply</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

                <v-list-item-icon v-if="item._id === selectedJobId">
                  <v-icon large color="blue">keyboard_arrow_right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider :key="`${index}-${item.title}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8" md="8" sm="12">
        <v-card elevation="2" v-if="Object.keys(jobDetail).length > 0">
          <v-card-title style="color: blue">Job Description</v-card-title>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-1">
                Company:
                <a :href="jobDetail.company_website" target="_blank">
                  {{ jobDetail.company_name }}
                </a>
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Location</strong>: {{ jobDetail.location }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar size="80" v-if="jobDetail.company_logo" tile>
              <v-img
                :src="`data:image/png1;base64,${jobDetail.company_logo}`"
                :alt="jobDetail.company_name"
              ></v-img>
            </v-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-subheader>
            <strong class="text-decoration-underline"> About Company </strong>
          </v-subheader>
          <v-card-text v-html="jobDetail.about_company"></v-card-text>

          <v-subheader>
            <strong class="text-decoration-underline">Job Description</strong>
          </v-subheader>
          <v-card-text v-html="jobDetail.job_description"></v-card-text>

          <v-subheader>
            <strong class="text-decoration-underline">Technology Stack</strong>
          </v-subheader>
          <v-card-text>
            <v-chip
              class="ml-2"
              color="primary"
              v-for="name in jobDetail.technologies"
              :key="name"
            >
              {{ name }}
            </v-chip>
          </v-card-text>

          <v-subheader>
            <strong class="text-decoration-underline">Responsibities</strong>
          </v-subheader>
          <v-card-text v-html="jobDetail.responsibilties"></v-card-text>

          <v-subheader>
            <strong class="text-decoration-underline">Requirement</strong>
          </v-subheader>
          <v-card-text v-html="jobDetail.required_experience"></v-card-text>

          <v-card-actions>
            <v-row align="center" justify="center" no-gutters>
              <v-btn color="primary" @click="showDialog = true" class="ma-2">
                Apply Job
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import { jobAPI, applicantAPI } from "@/services";

export default {
  data: () => ({
    moment: moment,
    jobList: [],
    jobDetail: {},
    selectedJobId: "",
    applicantData: {},

    rules: {
      nameValidation: [(v) => !!v || "Name is required"],
      emailValidation: [(v) => !!v || "Email is required"],
      phoneValidation: [(v) => !!v || "Phone is required"],
    },
    showDialog: false,

    // For Resume
    resumeName: "",
    resumeUrl: "",
    resumeFile: "",
    type: "",
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
        this.jobDetail = response.data;
      } catch (error) {
        console.log("====error===", error);
      }
    },

    async applyForJob() {
      try {
        this.applicantData.resume = this.resumeFile;
        let response = await applicantAPI.applyForJob(
          this.jobDetail._id,
          this.applicantData
        );
        this.showDialog = false;
        this.$root.$emit("SHOW_SNACKBAR", {
          text: response.message,
          color: "success",
        });
      } catch (error) {
        console.log("==error====", error);
        let data = error.data || {};
        this.$root.$emit("SHOW_SNACKBAR", {
          text: data.message || data.error || "Something went wrong",
          color: "error",
        });
      }
    },

    pickFile() {
      this.$refs.resume.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      this.resumeName = "";
      this.resumeFile = "";
      this.resumeUrl = "";
      this.type = "";
      if (files[0] !== undefined) {
        this.type = files[0].type;
        this.resumeName = files[0].name;
        if (this.resumeName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.resumeUrl = fr.result;
          this.resumeFile = files[0]; // this is an image file that can be sent to server...
        });
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
