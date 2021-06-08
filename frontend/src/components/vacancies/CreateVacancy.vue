<template>
  <div v-if="auth" class="form-wrapper">

    <main class>
      <form @submit.prevent="submit">
        <h2>Create vacancy</h2>

        <div class="form-floating">
          <input v-model="data.vacancyName" class="form-control" id="vacancyName" placeholder="Vacancy name">
          <label for="vacancyName">Vacancy name</label>
        </div>
        <div class="form-floating">
          <input v-model="data.company" class="form-control" id="company" placeholder="Company">
          <label for="company">Company</label>
        </div>
        <div class="form-floating">
          <input v-model="data.city" class="form-control" id="city" placeholder="City">
          <label for="city">City</label>
        </div>
        <div class="form-floating">
          <input v-model="data.description" class="form-control" id="description" placeholder="Description">
          <label for="description">Description</label>
        </div>

       <p></p> <button class="w-100 btn btn-lg btn-primary" type="submit">Create</button>
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
  name: "CreateVacancy",

  setup() {
    const data = reactive({
      vacancyName: '',
      company: '',
      city: '',
      description: '',
    });

    const router = useRouter();
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    const submit = async () => {
      const response = await fetch('http://localhost:3000/vacancies/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
      });

      const content = await response.json();

      if (response.ok) {
        await alert('Vacancy successfully created')
        await router.push('/vacancies/my');
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

.form-control {
  width: 1000px;
}

.form-wrapper {
  position: relative;
  left: -600px;
}

</style>
