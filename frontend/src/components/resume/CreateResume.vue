<template>
  <div v-if="!auth">
    <h1>You are not logged in!</h1>
  </div>

  <div v-if="auth">
    <h4 class="text-center mt-20">
      <small>
        <router-link class="w-100 btn btn-primary" to="/resume">View your resume</router-link>
      </small>
    </h4>

    <main class="form-signin">
      <form @submit.prevent="submit">
        <h2>Create resume</h2>

        <div class="form-floating">
          <input v-model="data.personalInformation" class="form-control" id="personalInformation" placeholder="Personal information">
          <label for="personalInformation">Personal information</label>
        </div>
        <div class="form-floating">
          <input v-model="data.title" class="form-control" id="title" placeholder="Title">
          <label for="title">Title</label>
        </div>
        <div class="form-floating">
          <input v-model="data.objective" class="form-control" id="objective" placeholder="Objective">
          <label for="objective">Objective</label>
        </div>
        <div class="form-floating">
          <input v-model="data.skills" class="form-control" id="skills" placeholder="Skills">
          <label for="skills">Skills</label>
        </div>
        <div class="form-floating">
          <input v-model="data.experience" class="form-control" id="experience" placeholder="Experience">
          <label for="experience">Experience</label>
        </div>
        <div class="form-floating">
          <input v-model="data.education" class="form-control" id="education" placeholder="Education">
          <label for="education">Education</label>
        </div>
        <div class="form-floating">
          <input v-model="data.languages" class="form-control" id="languages" placeholder="Languages">
          <label for="languages">Languages</label>
        </div>
        <div class="form-floating">
          <input v-model="data.hobbies" class="form-control" id="hobbies" placeholder="Hobbies">
          <label for="hobbies">Hobbies</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Create</button>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";

export default {
  name: "CreateResume",

  setup() {
    const data = reactive({
      personalInformation: '',
      title: '',
      objective: '',
      skills: '',
      experience: '',
      education: '',
      languages: '',
      hobbies: '',
    });

    const router = useRouter();
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    const submit = async () => {
      const response = await fetch('http://localhost:3000/resume/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
      });

      const content = await response.json();

      if (response.ok) {
        await alert('Resume successfully created')
        await router.push('/resume');
      } else if (typeof content.message === "object") {
        alert(content.message[0])
      } else {
        alert(content.message)
      }
    };

    return {
      data,
      submit,
      auth
    }
  }
};
</script>

<style scoped>

</style>
