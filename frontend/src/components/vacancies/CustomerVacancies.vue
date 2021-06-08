<template>
  <div v-if="auth" class="form-wrapper">

    <div v-if="vacancies.length === 0">
      <h2 style="width: 520px">No vacancy found at the moment </h2>
      <router-link class="w-100 btn btn-lg btn-primary" to="/vacancies/create" >Create new Vacancy</router-link>
    </div>

    <div v-if="vacancies.length > 0">
      <h2 style=" position: relative; left: -200px; ">Your vacancies</h2>

      <div id="content">
        <table class="table_blur">
          <tr>
            <th scope="col">Vacancy</th>
            <th scope="col">Company</th>
            <th scope="col">City</th>
            <th scope="col">Description</th>
            <div>
              <router-link class="w-200 btn btn-lg btn-primary" id="create-btn" to="/vacancies/create">Create new vacancy</router-link>
            </div>
          </tr>
          <tr v-for="vacancy in vacancies" :key="vacancy.id">
            <td>{{ vacancy.vacancyName }}</td>
            <td>{{ vacancy.company }}</td>
            <td>{{ vacancy.city }}</td>
            <td>{{ vacancy.description }}</td>
            <td>
                <div class="btn-group">
                  <router-link :to="{ path: `/vacancies/update/${vacancy.id}`}" class="btn btn-sm btn-outline-secondary" id="edit-btn">Edit vacancy</router-link>
                  <button class="btn btn-sm btn-outline-secondary" id="apply-btn" @click="deleteVacancy(vacancy.id)">Delete vacancy</button>
                </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";

export default {
  name: "CustomerVacancies",

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

#content {
  margin: 0 auto;
  position: relative;
  left: -200px;
}

.form-wrapper {
  position: relative;
  left: -400px;
}

#edit-btn {
  width: 100px;
  height: 40px;
  line-height: 28px;
}

#apply-btn {
  width: 115px;
  height: 40px;
}

#create-btn {
  border-left: 1px solid #777777;
  border-bottom:  1px solid #777777;
  box-shadow: inset 1px 1px 0 #999999, inset 0 -1px 0 #999999;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .08));
  background: linear-gradient(#9565b6, #5a507f);
  font-size: 17px;
  margin-left: 15px;
  width: 210px;
  height: 44px;
  line-height: 24px;
}

.table_blur {
  background: #f5ffff;
  border-collapse: collapse;
  text-align: left;
  width: 1600px;
}

.table_blur th {
  border-top: 1px solid #777777;
  border-bottom: 1px solid #777777;
  box-shadow: inset 0 1px 0 #999999, inset 0 -1px 0 #999999;
  background: linear-gradient(#9595b6, #5a567f);
  color: white;
  padding: 10px 15px;
  position: relative;
}

.table_blur th:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 25%;
  height: 25%;
  width: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .08));
}

.table_blur tr:nth-child(odd) {
  background: #ebf3f9;
}

.table_blur th:first-child {
  border-left: 1px solid #777777;
  border-bottom: 1px solid #777777;
  box-shadow: inset 1px 1px 0 #999999, inset 0 -1px 0 #999999;
}

.table_blur th:last-child {
  border-right: 1px solid #777777;
  border-bottom: 1px solid #777777;
  box-shadow: inset -1px 1px 0 #999999, inset 0 -1px 0 #999999;
}

.table_blur td {
  border: 1px solid #e3eef7;
  padding: 10px 15px;
  position: relative;
  transition: all 0.5s ease;
}

</style>
