// TODO: File sollte file Explorer heißen ?

<template>
  <v-app id="inspire">
    <Navigation />

    <v-main>
      <h1 align>File Explorer</h1>
      <v-list dense rounded>
        <v-list-item v-for="item in items2" :key="item.title" link>
          <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="on_item_click(item.number)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import { mdiFolder } from "@mdi/js";
import { mdiCogOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";

import axios from "axios";
import { mdiFileAccount } from "@mdi/js";
export default {
  components: {
      Navigation,
    },
  data: () => ({
    currentPath: [],
    drawer: null,
    failed: false,
    items: [
      { title: "File Explorer", icon: mdiFolder },
      { title: "Settings", icon: mdiCogOutline },
      { title: "Logout", icon: mdiLogout },
    ],
    items2: [],
  }),
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.get_files();
  },
  methods: {
    on_item_click(number_item) {
      var clicked_item = this.items2[number_item];
      if (!clicked_item["directory"]) return;
      if (clicked_item["title"] == "..") {
        this.currentPath.pop();
        this.get_files();
        return;
      }
      this.currentPath.push(clicked_item["title"]);
      this.get_files();
    },
    get_files() {
      console.log(this.currentPath);
      var file_path = "/";
      for (var i = 0; i < this.currentPath.length; i++) {
        file_path += this.currentPath[i] + "/";
      }
      axios
        .post("http://localhost:5000/fileexplorer", { directory: file_path })
        .then(
          (res) => {
            if (res.status === 200) {
              console.log(res.data);
              this.items2 = [];
              this.items2.push({
                title: "..",
                directory: true,
                icon: mdiFolder,
                number: this.items2.length,
              });
              for (var i = 0; i < res.data.length; i++) {
                let new_val = {
                  title: res.data[i]["name"],
                  directory: res.data[i]["directory"],
                  icon: mdiFileAccount,
                  number: this.items2.length,
                };
                if (new_val["directory"]) {
                  new_val["icon"] = mdiFolder;
                }
                this.items2.push(new_val);
              }
            }
          },
          (err) => {
            this.failed = true;
            console.log(err.response);
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
</style>
