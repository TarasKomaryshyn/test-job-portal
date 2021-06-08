<template>
  <div v-if="!auth">
    <h1>You are not logged in!</h1>
  </div>

  <main v-if="auth" class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Reset password</h1>

      <div class="form-floating">
        <input v-model="data.oldPassword" class="form-control" type="password" id="oldPassword" placeholder="Old password">
        <label for="oldPassword">Old password</label>
      </div>
      <div class="form-floating">
        <input v-model="data.newPassword" class="form-control" type="password" id="newPassword" placeholder="New password">
        <label for="newPassword">New password</label>
      </div>

      <p></p><button class="w-100 btn btn-lg btn-primary" type="submit">Confirm</button>
    </form>
  </main>
</template>

<script lang="ts">
import {computed, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import getAccessToken from "@/helper/accessToken";
import {useStore} from "vuex";

export default {
  name: "Password",
  setup() {
    const data = reactive({
      oldPassword: '',
      newPassword: '',
    });

    const router = useRouter()
    const store = useStore();

    const role = ref('');
    const response = ref();
    const content = ref();
    const token: string = getAccessToken();
    const auth = computed(() => store.state.authenticated);

    if (getAccessToken()) {
      store.dispatch('setAuth', true);
    }

    const submit = async () => {
      response.value = await fetch('http://localhost:3000/auth/profile', {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      content.value = await response.value.json();
      role.value = content.value.role;

      if (role.value === 'customer') {
        response.value = await fetch('http://localhost:3000/customers/password', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
          body: JSON.stringify(data)
        });
        content.value = await response.value.json();
      } else if (role.value === 'candidate') {
        response.value = await fetch('http://localhost:3000/candidates/password', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
          body: JSON.stringify(data)
        });
        content.value = await response.value.json();
      }

      if (response.value.ok) {
        await alert('Password changed successfully')
        await router.push('/');
      } else if (typeof content.value.message === "object") {
        alert(content.value.message[0])
      } else {
        alert(content.value.message)
      }
    };

    return {
      data,
      submit,
      auth
    }
  }
}
</script>

<style scoped>

</style>
