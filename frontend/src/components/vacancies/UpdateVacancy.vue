<template>
  <div v-if="!auth">
    <h1>You are not logged in!</h1>
  </div>

  <div v-if="auth">
    <h4 class="text-center mt-20">
      <small>
        <router-link class="w-100 btn btn-primary" to="/vacancies">View your vacancies</router-link>
      </small>
    </h4>

    <main class="form-signin">
      <form @submit.prevent="submit">
        <h2>Edit vacancy</h2>

        <div class="form-floating">
          <input v-model="vacancy.vacancyName" class="form-control" id="vacancyName" placeholder="Vacancy name">
          <label for="vacancyName">Vacancy name</label>
        </div>
        <div class="form-floating">
          <input v-model="vacancy.company" class="form-control" id="company" placeholder="Company">
          <label for="company">Company</label>
        </div>
        <div class="form-floating">
          <input v-model="vacancy.city" class="form-control" id="city" placeholder="City">
          <label for="city">City</label>
        </div>
        <div class="form-floating">
          <input v-model="vacancy.description" class="form-control" id="description" placeholder="Description">
          <label for="description">Description</label>
        </div>

       <p></p> <button class="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
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
  name: "UpdateVacancy",

  props: {
    id: String
  },

  setup(props: any) {

    const vacancy = ref({});
    const response = ref();

    const router = useRouter();
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    onMounted(async () => {
      response.value = await fetch(`http://localhost:3000/vacancies/${props.id}`, {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      vacancy.value = await response.value.json();
    });

    const submit = async () => {
      response.value = await fetch(`http://localhost:3000/vacancies/update/${props.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(vacancy.value)
      });
      const content = await response.value.json();

      if (response.value.ok) {
        await alert('Vacancy successfully edited')
        await router.push('/vacancies');
      } else if (typeof content.message === "object") {
        alert(content.message[0])
      } else {
        alert(content.message)
      }
    };

    return {
      submit,
      auth,
      vacancy
    }
  }
};

</script>

<style scoped>

</style>
