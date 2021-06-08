<template>
  <div v-if="!auth">
    <h1>You are not logged in!</h1>
  </div>

  <div v-if="auth">
    <h4 class="text-center mt-20">
      <small>
        <router-link class="w-100 btn btn-primary" to="/resume">Back to resume</router-link>
      </small>
    </h4>

    <main class="form-signin">
      <form @submit.prevent="submit">
        <h2>Edit resume</h2>

        <div class="form-floating">
          <input v-model="resume.personalInformation" class="form-control" id="personalInformation" placeholder="Personal information">
          <label for="personalInformation">Personal information</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.title" class="form-control" id="title" placeholder="Title">
          <label for="title">Title</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.objective" class="form-control" id="objective" placeholder="Objective">
          <label for="objective">Objective</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.skills" class="form-control" id="skills" placeholder="Skills">
          <label for="skills">Skills</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.experience" class="form-control" id="experience" placeholder="Experience">
          <label for="experience">Experience</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.education" class="form-control" id="education" placeholder="Education">
          <label for="education">Education</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.languages" class="form-control" id="languages" placeholder="Languages">
          <label for="languages">Languages</label>
        </div>
        <div class="form-floating">
          <input v-model="resume.hobbies" class="form-control" id="hobbies" placeholder="Hobbies">
          <label for="hobbies">Hobbies</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";


export default {
  name: "UpdateResume",

  setup() {
    const resume = ref({});
    const response = ref();

    const router = useRouter();
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    onMounted(async () => {
      response.value = await fetch('http://localhost:3000/resume', {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      resume.value = await response.value.json();
    });

    const submit = async () => {
      response.value = await fetch(`http://localhost:3000/resume/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(resume.value)
      });
      const content = await response.value.json();

      if (response.value.ok) {
        await alert('Resume successfully edited')
        await router.push('/resume');
      } else if (typeof content.message === "object") {
        alert(content.message[0])
      } else {
        alert(content.message)
      }
    };

    return {
      submit,
      auth,
      resume
    }
  }
};

</script>

<style scoped>

</style>
