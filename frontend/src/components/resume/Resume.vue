<template>
  <div v-if="auth" class="form-wrapper">

    <div v-if="resume.message" style="position: relative; right: -500px;">
      <h2 style="width: 520px">No resume found at the moment </h2>
      <router-link class="w-100 btn btn-lg btn-primary" to="/resume/create" style="position: relative; right: -100px;">Create Resume</router-link>
    </div>

    <main v-if="!resume.message">
      <h2>Your Resume</h2>

      <div class="form-floating">
        <input v-model="resume.personalInformation" class="form-control" id="personalInformation" placeholder="Personal information" readonly>
        <label for="personalInformation">Personal information</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.title" class="form-control" id="title" placeholder="Title" readonly>
        <label for="title">Title</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.objective" class="form-control" id="objective" placeholder="Objective" readonly>
        <label for="objective">Objective</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.skills" class="form-control" id="skills" placeholder="Skills" readonly>
        <label for="skills">Skills</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.experience" class="form-control" id="experience" placeholder="Experience" readonly>
        <label for="experience">Experience</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.education" class="form-control" id="education" placeholder="Education" readonly>
        <label for="education">Education</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.languages" class="form-control" id="languages" placeholder="Languages" readonly>
        <label for="languages">Languages</label>
      </div>
      <div class="form-floating">
        <input v-model="resume.hobbies" class="form-control" id="hobbies" placeholder="Hobbies" readonly>
        <label for="hobbies">Hobbies</label>
      </div>

      <router-link class="w-100 btn btn-lg btn-primary" to="/resume/update" >Edit Resume</router-link>

    </main>
  </div>

</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";

export default {
  name: "Resume",
  setup() {
    const resume = ref({});
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    onMounted(async () => {
      const response = await fetch('http://localhost:3000/resume', {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      resume.value = await response.json();
      return true;
    });

    return {
      resume,
      auth,
    }
  }
};
</script>

<style scoped>

.form-control {
  width: 1200px;
}

.form-wrapper {
  position: relative;
  left: -600px;
}

</style>
