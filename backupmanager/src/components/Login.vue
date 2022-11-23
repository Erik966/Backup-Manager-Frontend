<template>
  <form @submit.prevent="handleLogin">
    <h3>Login</h3>

    <div class="from-group">
      <label> Email</label>
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="username"
      />
    </div>

    <div>
      <label> Password</label>
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
      />
    </div>

    <button class="btn btn-primary btn-block" @click="handleLogin">
      Login
    </button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: this.password,
      username: this.username,
    };
  },
  methods: {
    handleLogin() {
      if(this.password == "admin" && this.username == "admin"){
        console.log("right pw");
      }
    },
  },
};
</script>
