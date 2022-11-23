<template>
  <form>
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

    <button class="btn btn-primary btn-block" @click.prevent="handleSubmit">Login</button>
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
    handleSubmit() {
      if (this.password == "admin" && this.username == "admin") {
        this.$router.push("/");
        this.$emit("handleLogin", true);
      }
    },
  },
};
</script>
