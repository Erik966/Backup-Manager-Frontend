<template>
  <v-app>
    <div >
    <v-toolbar dark class="justify-center">
      <v-row>
        <v-col class="justify-center">
          <h1 align="center">BackupManager</h1>
        </v-col>
        <!-- <v-col class="text-right">
          <v-btn to="/">Login</v-btn>
          <v-btn to="/secure">Secure</v-btn>
        </v-col> -->
      </v-row>
   
    </v-toolbar>
  </div>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
 
  },
};
</script>
<style scoped>

</style>


