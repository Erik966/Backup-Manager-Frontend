<template>
  <nav class="navbar navbar-expand navbar-light fixed top">
    <div class="container">
      <router-link to="/" class="nav-link">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link v-if="loggedIn == false" to="/login" class="nav-link"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <a href="#" v-if="loggedIn == false" class="nav-link">Sign Up</a>
          </li>
          <li class="nav-item">
            <router-link
              @click="reset"
              to="/login"
              v-if="loggedIn"
              class="nav-link"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
let loggedIn;

export default {
  name: "Navigation",
  props: {
    loggedIn,
  },
  methods: {
    reset() {
      loggedIn = false;
    },
  },
};
</script>
