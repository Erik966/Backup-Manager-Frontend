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

    <button class="btn btn-primary btn-block" @click="handleLogin">Login{{password}}</button>

  </form>
</template>

<script>

let password = ""
console.log("1. " + password );


export default {
  name: "Login",
  methods: {
    handleLogin() {
      //console.log(username+ password + "123");
    },
  },
};
</script>
