<template>
  <v-card elevation="2">
    <v-card-title class="header">
      Add Job

      <v-spacer></v-spacer>
      <v-btn small color="primary" to="/jobs">
        <v-icon>keyboard_backspace</v-icon>
        Go To Job List
      </v-btn>
    </v-card-title>
    <v-form lazy-validation class="ma-3">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.title"
            :rules="rules.titleValidation"
            label="Job Title"
            prepend-icon="person"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.company_name"
            :rules="rules.companyNameValidation"
            label="Company Name"
            prepend-icon="person"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.company_website"
            :rules="rules.companyWebsiteValidation"
            label="Link of Company Website"
            prepend-icon="home_work"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="jobData.location"
            :rules="rules.locationValidation"
            label="Location of company"
            prepend-icon="home"
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
            label="Technologies Stack"
            multiple
            prepend-icon="mdi-filter-variant"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeTechnology(item)"
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
            prepend-icon="mdi-comment"
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
              Candidate Experience
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <wysiwyg v-model="jobData.required_experience" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

      <v-row class="ma-3">
        <v-expansion-panels v-model="qualificationEditor" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Educational Qualification
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <wysiwyg v-model="jobData.educational_qualification" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-form>

    <v-card-actions>
      <v-row align="center" justify="center" no-gutters>
        <v-btn color="error" to="/jobs" class="ma-2">Cancel</v-btn>
        <v-btn
          color="primary"
          @click="addJob"
          class="ma-2"
          :disabled="isFormValid"
          >Save</v-btn
        >
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import "../../assets/vueWysiwyg.css";

export default {
  data: () => ({
    jobData: {},

    isFormValid: false,
    rules: {
      titleValidation: [(v) => !!v || "Title is required"],
      companyNameValidation: [(v) => !!v || "Company Name is required"],
      companyWebsiteValidation: [(v) => !!v || "Company Website is required"],
      locationValidation: [(v) => !!v || "Location is required"],
      aboutCompanyValidation: [(v) => !!v || "About Company is required"],
    },

    responsibiltyEditor: [0],
    experienceEditor: [0],
    qualificationEditor: [0],

    // For Company Logo
    imageName: "",
    imageUrl: "",
    imageFile: "",
    type: "",
  }),

  methods: {
    addJob() {
      console.log("jobData=== ", this.jobData);
    },

    removeTechnology(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
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
};
</script>
