<template>
  <v-card elevation="2">
    <v-card-title class="header">
      Edit Job

      <!-- <v-spacer></v-spacer>
      <v-btn small color="primary" to="/jobs">
        <v-icon>keyboard_backspace</v-icon>
        Go To Job List
      </v-btn> -->
    </v-card-title>
    <v-form lazy-validation class="ma-3">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.title"
            :rules="rules.titleValidation"
            label="Job Title"
            prepend-icon="work"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.company_name"
            :rules="rules.companyNameValidation"
            label="Company Name"
            prepend-icon="business"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.company_website"
            :rules="rules.companyWebsiteValidation"
            label="Company Website"
            prepend-icon="language"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.location"
            :rules="rules.locationValidation"
            label="Location of company"
            prepend-icon="location_on"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="10">
              <v-text-field
                placeholder="Select Company Logo"
                @click="pickFile"
                v-model="imageName"
                prepend-icon="attach_file"
                @click:prepend="pickFile"
                autocomplete="off"
                readonly
              ></v-text-field>
              <input
                type="file"
                accept="image/*"
                ref="image"
                @change="onFilePicked"
                style="display: none"
              />
            </v-col>
            <v-col cols="2">
              <img :src="imageUrl" height="50" v-if="imageUrl" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-combobox
            v-model="jobData.technologies"
            chips
            clearable
            label="Technology Stack"
            multiple
            prepend-icon="mdi-filter-variant"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeChips(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="jobData.about_company"
            :rules="rules.aboutCompanyValidation"
            label="About Company"
            rows="2"
            prepend-icon="bookmark"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="jobData.job_description"
            :rules="rules.jobDescValidation"
            label="Job Description"
            rows="2"
            prepend-icon="announcement"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row class="ma-3">
        <v-expansion-panels v-model="responsibiltyEditor" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Job Responsibilty
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <wysiwyg v-model="jobData.responsibilties" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

      <v-row class="ma-3">
        <v-expansion-panels v-model="experienceEditor" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Job Requirement
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <wysiwyg v-model="jobData.required_experience" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-form>

    <v-card-actions>
      <v-row align="center" justify="center" no-gutters>
        <v-btn color="error" to="/jobs" class="ma-2">Cancel</v-btn>
        <v-btn color="primary" @click="editJob" class="ma-2">Save</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import "../../assets/vueWysiwyg.css";
import { jobAPI } from "@/services";

export default {
  data: () => ({
    jobData: {},

    rules: {
      titleValidation: [(v) => !!v || "Title is required"],
      companyNameValidation: [(v) => !!v || "Company Name is required"],
      companyWebsiteValidation: [(v) => !!v || "Company Website is required"],
      locationValidation: [(v) => !!v || "Location is required"],
      aboutCompanyValidation: [(v) => !!v || "About Company is required"],
      jobDescValidation: [(v) => !!v || "Job Description is required"],
    },

    responsibiltyEditor: [0],
    experienceEditor: [0],

    // For Company Logo
    imageName: "",
    imageUrl: "",
    imageFile: "",
    type: "",
  }),

  methods: {
    async getJobDetail() {
      let jobId = this.$route.params.id;
      try {
        let response = await jobAPI.getJobDetailById(jobId);
        this.jobData = response.data;
        this.imageUrl = `data:image/png;base64,${this.jobData.company_logo}`;
        delete this.jobData.company_logo;
        delete this.jobData.slug;
        delete this.jobData.no_of_applicants;
      } catch (error) {
        console.log("=====error====", error);
      }
    },

    async editJob() {
      let jobId = this.$route.params.id;
      try {
        let response = await jobAPI.editJob(jobId, this.jobData);
        if (this.type) {
          await jobAPI.uploadLogo(jobId, this.imageFile);
        }
        this.$root.$emit("SHOW_SNACKBAR", {
          text: response.message,
          color: "success",
        });
        this.$router.push("/jobs");
      } catch (error) {
        console.log("===error==", error);
        let data = error.data || {};
        this.$root.$emit("SHOW_SNACKBAR", {
          text: data.message || data.error || "Something went wrong",
          color: "error",
        });
      }
    },

    removeChips(item) {
      this.jobData.technologies.splice(
        this.jobData.technologies.indexOf(item),
        1
      );
      this.jobData.technologies = [...this.jobData.technologies];
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
      this.type = "";
      if (files[0] !== undefined) {
        this.type = files[0].type;
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          this.disableButton = false;
        });
      }
    },
  },

  mounted() {
    this.getJobDetail();
  },
};
</script>
