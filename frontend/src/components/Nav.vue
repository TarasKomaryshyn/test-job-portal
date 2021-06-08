<template>
  <div v-if="!auth">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <strong class="navbar-brand">JOB PORTAL</strong>

        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/login" class="navbar-brand">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/customers/register" class="navbar-brand">Register as customer</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/candidates/register" class="navbar-brand">Register as candidate</router-link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </div>

  <div v-if="auth">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <strong class="navbar-brand">JOB PORTAL</strong>

        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/password" class="navbar-brand">Reset password</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="navbar-brand" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </div>

</template>

<script lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const auth = computed(() => store.state.authenticated);

    const logout = () => {
      localStorage.removeItem('user');
      store.dispatch('setAuth', false);
    }

    return {
      auth,
      logout
    }
  }
};
</script>
