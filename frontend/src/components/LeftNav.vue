<template>
  <div v-if="auth && role === 'candidate'" class="sidenav">
    <a href="/">HOME</a>
    <router-link to="/resume">RESUME</router-link>
    <router-link to="/vacancies">VACANCIES</router-link>
    <router-link to="/">...</router-link>
    <router-link to="/">...</router-link>
  </div>

  <div v-if="auth && role === 'customer'" class="sidenav">
    <a href="/">HOME</a>
    <router-link to="/vacancies/my">VACANCIES</router-link>
    <router-link to="/">...</router-link>
    <router-link to="/">...</router-link>
    <router-link to="/">...</router-link>
  </div>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import getAccessToken from "@/helper/accessToken";

export default {
  name: "LeftNav",
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const token: string = getAccessToken();
    const role = ref('');


    onMounted(async () => {
      role.value = '';
      const response = await fetch('http://localhost:3000/auth/profile', {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
      const content = await response.json();

      role.value = content.role;

      return true;
    });

    return {
      auth,
      role
    }
  }
};
</script>

<style scoped>


/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  /*width: 160px; !* Set the width of the sidebar *!*/
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 56px; /* Stay at the top */
  left: 0;
  background-color: #f5f5f5;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0px;
}

/* The navigation menu links */
.sidenav a {
  font-weight: bold;
  font-family: "Noto Sans CJK HK";
  font-style: normal;
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 15px;
  color: black;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: red;
}

/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>
