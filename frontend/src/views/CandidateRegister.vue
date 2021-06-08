<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h4 mb-3 ">Candidate registration</h1>

      <div class="form-floating">
        <input v-model="data.firstName" class="form-control" id="firstName" placeholder="First name">
        <label for="firstName">First name</label>
      </div>
      <div class="form-floating">
        <input v-model="data.lastName" class="form-control" id="lastName" placeholder="Last name">
        <label for="lastName">Last name</label>
      </div>
      <div class="form-floating">
        <input v-model="data.email" class="form-control" id="email" placeholder="Email">
        <label for="Email">Email</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" class="form-control" type="password" id="password" placeholder="Password">
        <label for="password">Password</label>
      </div>

      <p></p><button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from "vue-router";

export default {
  name: "CandidateRegister",
  setup() {
    const data = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    const router = useRouter();

    const submit = async () => {
      const response =  await fetch('http://localhost:3000/candidates/registration', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      const content = await response.json();

      if(response.ok) {
        await alert('You have successfully registered')
        await router.push('/login');
      } else if (typeof content.message === "object") {
        alert(content.message[0])
      } else {
        alert(content.message)
      }
    };

    return {
      data,
      submit
    }
  }
};
</script>

<style scoped>

</style>
