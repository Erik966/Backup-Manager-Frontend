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
import CryptoJS from "crypto-js";

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

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },

    power(x, n, p){
      let res = 1;
      for (let i = 1; i <= n; i++) res = (res * x) % p;
      return res;
    },

    login() {
      
      axios.post('http://192.168.0.107:5000/login_name', {username: this.username}).then(res => {
          if (res.status === 200) {
            let x = this.getRandomInt(res.data.P-1);
            let X = this.power(res.data.G, x,res.data.P);

             localStorage.setItem("ka", this.power(res.data.Y, x, res.data.P).toString());

             localStorage.setItem("username", this.username)

             axios.post('http://192.168.0.107:5000/key', {username: this.username, X: X.toString(10)}).then(res => {
                if (res.status === 200) {
                  console.log("Key exchange");
    
                  let user = {
                      username: this.username,
                      password: CryptoJS.AES.encrypt(this.password, localStorage.getItem("ka")).toString()
                    }

                  axios.post('http://192.168.0.107:5000/login', user)
                      .then(res => {
                        //if successfull
                        if (res.status === 200) {
                          localStorage.setItem('token', res.data.token);
                          localStorage.setItem("key_diff", CryptoJS.AES.decrypt(res.data.secret, localStorage.getItem("ka")).toString(CryptoJS.enc.Utf8));
                          console.log("T" + localStorage.getItem("key_diff"))
                          this.$router.push('/secure');
                        }
                      }, err => {
                        this.failed = true;
                        console.log(err.response);
                      })
                    }
                  }, err => {
                    console.log(err.response);
                    return;
                  })
              }
            }, err => {
              console.log(err.response);
              return;
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
