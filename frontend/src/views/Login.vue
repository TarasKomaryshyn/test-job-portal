<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h2 mb-3 fw-normal">Please sign in</h1>

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
import {reactive} from 'vue'
import {useRouter} from "vue-router";

export default {
  name: "Login",
  setup() {
    const data = reactive({
      email: '',
      password: '',
    });

    const router = useRouter()

    const submit = async () => {
      await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
          .then((response) => response.json())
          .then((user) => {
            if (user.access_token) {
              localStorage.setItem('user', JSON.stringify(user));
              router.push('/')
            } else if (!data.email || !data.password) {
              alert('Email and password should not be empty')
            } else {
              alert(user.message)
            }
          })
    };

    return {
      data,
      submit,
    }
  }
}
</script>

<style scoped>

</style>
