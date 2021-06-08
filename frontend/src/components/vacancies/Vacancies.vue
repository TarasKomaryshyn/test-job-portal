<template>
  <div v-if="!auth">
    <h1>You are not logged in!</h1>
  </div>

  <div v-if="vacancies.length === 0">
    <h2 style="width: 520px">No vacancy found at the moment </h2>
    <router-link class="w-100 btn btn-lg btn-primary" to="/vacancies/create" >Create new vacancy</router-link>
  </div>

  <div v-if="auth && vacancies.length > 0" class="container-fluid" >

    <div class="text-center">
      <div class="btn-group">
        <h2 style="width: 230px; ">Your vacancies</h2>
        <router-link class="w-200 btn btn-lg btn-primary" to="/vacancies/create" style=" margin-left: 30px; width: 220px; height: 40px; line-height: 20px">Create new vacancy</router-link>
      </div>

    </div>

    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Vacancy</th>
          <th scope="col">Company</th>
          <th scope="col">City</th>
          <th scope="col">Description</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="vacancy in vacancies" :key="vacancy.id">
          <td>{{ vacancy.vacancyName }}</td>
          <td>{{ vacancy.company }}</td>
          <td>{{ vacancy.city }}</td>
          <td>{{ vacancy.description }}</td>
          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link :to="{ path: `/vacancies/update/${vacancy.id}`}" class="btn btn-sm btn-outline-secondary">
                  Edit vacancy
                </router-link>
                <button class="btn btn-sm btn-outline-secondary" @click="deleteVacancy(vacancy.id)">Delete vacancy</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";

export default {
  name: "Vacancies",

  methods: {
    async deleteVacancy(id: number) {
      const response = await fetch(`http://localhost:3000/vacancies/delete/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getAccessToken()}`},
      });

      if (response.ok) {
        await alert('Vacancy successfully deleted')
        await window.location.reload();
      }
    }
  },

  setup() {
    const vacancies = ref([]);
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    onMounted(async () => {
      const response = await fetch('http://localhost:3000/vacancies', {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      vacancies.value = await response.json();
    });

    return {
      vacancies,
      auth,
      token
    }
  }
};
</script>

<style scoped>

</style>
