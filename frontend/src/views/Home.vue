<template>
  <div>
    <h1>This is Home page!</h1>
  </div>
</template>

<script lang="ts">
import {computed, onMounted} from "vue";
import getAccessToken from '@/helper/accessToken'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "Home",
  setup() {
    const token: string = getAccessToken();
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const router = useRouter()

      onMounted(async () => {
        const response = await fetch('http://localhost:3000/auth/profile', {
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        });

        const content = await response.json();

        if (content.role) {
          await store.dispatch('setAuth', true);
          return true;
        } else {
          router.push('/login')
        }

      });

    return {
      auth
    }
  }
};
</script>

<style scoped>

</style>
