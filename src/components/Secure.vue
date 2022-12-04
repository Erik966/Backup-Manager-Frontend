// TODO: Component sollte file Explorer nicht Secure heißen ?

<template>
  <div id="inspire">
    <Navigation />

    <v-content>
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
            <v-list-item-icon v-if="item.title != check_val">
              <v-btn @click="get_download(item.title)">
              <v-icon>{{ icons[0] }}</v-icon>
              </v-btn>
              <v-btn @click="removeBundle(editForm.suggested_bundles, bundle)">
              <v-icon small>mdi-delete</v-icon>
        </v-btn>
          </v-list-item-icon>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
  color="primary"
  elevation="3"
  raised
  @click=upload_files()
>Upload</v-btn>
<input type="file" ref="files" v-on:change="handleFilesUpload()" multiple>
    </v-content>
      </div>

</template>

<script>
import Navigation from '../components/Navigation.vue'
import { mdiFolder } from "@mdi/js";
import { mdiCogOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";


import axios from "axios";
import { mdiFileAccount } from "@mdi/js";
import { mdiTrayArrowDown } from '@mdi/js';
// import { mdiDownloadCircle } from '@mdi/js';
export default {
  components: {
      Navigation,
    },
  data: () => ({
    currentPath: [],
    drawer: null,
    failed: false,
    files_to_upload: "",
    check_val: "..",
    icons: [mdiTrayArrowDown],
    items: [
      { title: "File Explorer", icon: mdiFolder },
      { title: "Settings", icon: mdiCogOutline},
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
    get_download(filename){
      console.log(filename);
      var file_path = "/";
      for (var i = 0; i < this.currentPath.length; i++) {
        file_path += this.currentPath[i] + "/";
      }
      file_path += filename;
      axios.get("http://localhost:5000/download", { responseType: 'blob',params:{file_path: file_path, file_name: this.currentPath[-1]} }).then(
      response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download.zip");
        document.body.appendChild(link);
        link.click();
      }
    ).catch(console.error)
    },
    handleFilesUpload(){
  this.files_to_upload = this.$refs.files.files;
  // console.log(this.files_to_upload);
},
    upload_files()
    {
      
         let data = new FormData();
      for( var i = 0; i < this.files_to_upload.length; i++ ){
    let file = this.files_to_upload[i];

    data.append('files'+i, file)
      }

    var file_path = "/";
      for (var i_file = 0; i_file < this.currentPath.length; i_file++) {
        file_path += this.currentPath[i_file] + "/";
      }
    data.append("destination", file_path);
    axios.post("http://localhost:5000/upload", data).then(
      response => {
          console.log(response);
          this.get_files();
      }
    )
      
      


        
      

    }
  },
};
</script>

<style>
h1 {
  text-align: center;
}
</style>
