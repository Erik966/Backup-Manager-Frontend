<template>
<v-app>
    <v-main>
       <v-alert
       border="left"
                color="red"
                type="warning"
              :value="failed"
            >
              The username or the password is incorrect.
            </v-alert>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title class="justify-center">Login</v-card-title>
        
        <v-card-text>
          <v-text-field v-model="username" label="Username" prepend-icon="mdi-account-circle"/>
          <v-text-field 
          v-model="password"
          label="Password" 
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="info" @click="login()">Login</v-btn>
        </v-card-actions>

      </v-card>
    </v-main>
</v-app>
</template>

<script>
import axios from 'axios';

export default {
  data()
  {
    return{
      username: "",
      password: "",
      showPassword:false,
      failed: false
    }
  },
  props: {
  },
   methods: {
    login() {
      let user = {
        username: this.username,
        password: this.password
      }
     axios.post('http://localhost:5000/login', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/secure');
          }
        }, err => {
          this.failed = true;
          console.log(err.response);
          this.error = err.response.data.error
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.h1 {
  size: 40px;
}
.hello {
  text-align: center;
  height: 100%;
  background: #AAAAAA;
  
}
</style>
