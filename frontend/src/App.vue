<template>
  <Nav/>
  <LeftNav v-if="auth"/>

  <main class="form-signin">
    <router-view/>
  </main>

</template>
<script>
import Nav from '@/components/Nav.vue'
import LeftNav from '@/components/LeftNav.vue'
import {useStore} from "vuex";
import {computed} from "vue";


export default {
  components: {Nav, LeftNav},

  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    return {
      auth
    }
  }
}
</script>

<style>

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

h1 {
  font-weight: bold;
  color: black;
  font-size: 40px;
  width: 1000px;
}

h2 {
  font-weight: bolder;
  color: black;
  font-size: 32px;
  width: 250px;
}
</style>
