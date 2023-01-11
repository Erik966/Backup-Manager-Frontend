// TODO: Component sollte file Explorer nicht Secure heißen ?

<template>
  <v-main>
    <Navigation />

    <h1 align>File Explorer</h1>
    <div class="fileExplorerContainer">
      <v-list dense rounded>
        <v-list-item v-for="item in items2" :key="item.title" link>
          <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="on_item_click(item.number)">
            <v-list-item-title >{{
              item.title
            }}</v-list-item-title>
            <div class="buttonContainer" v-if="item.title != check_val">
              <div>
                <v-btn @click="get_download(item.title)">
                  <v-icon>{{ icons[0] }}</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn @click="remove_file(item.title)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn @click="move_file(item.title)">
                  <v-icon small> {{icons[1]}}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="consoleContainer">
        <div>
          <v-btn color="primary" elevation="3" raised @click="upload_files()"
            >Upload</v-btn
          >
        </div>
        <div class="fileInput">
          <template>
            <v-file-input
              label="File input"
              outlined
              dense
              filled
              show-size
              multiple
              truncate-length="15"
              background-color="#222222"
              v-model="files_to_upload"
            ></v-file-input>
<!--             <v-file-input
                  accept=".txt"
                  label="Click here to select a .txt file"
                  outlined
files_to_upload                >  </v-file-input> -->
          </template>
        </div>
        <div>
          <v-text-field v-model="dirname" label="dirname" />
        </div>
          <v-text-field
            label="Filled"
            placeholder="Placeholder"
            solo
            color="primary"
          ></v-text-field>
        <div>
          <v-btn color="primary" elevation="3" raised @click="mkdir()"
            >MkDir</v-btn
          >
        </div>

      </div>
    </div>
  </v-main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import { mdiFolder } from "@mdi/js";
import { mdiCogOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";
import { mdiContentCopy } from "@mdi/js";

import axios from "axios";
import { mdiFileAccount } from "@mdi/js";
import { mdiTrayArrowDown } from "@mdi/js";
// import { mdiDownloadCircle } from '@mdi/js';
export default {
  components: {
    Navigation,
  },
  data: () => ({
    currentPath: [],
    files_to_upload: "",
    drawer: null,
    failed: false,
    check_val: "..",
    copy_path: "",
    copy_name: "",
    dirname: "",
    icons: [mdiTrayArrowDown, mdiContentCopy],
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
      console.log("reached muss");
      var clicked_item = this.items2[number_item];
      console.log(clicked_item);
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

      let data = new FormData();

      data.append("directory" ,this.currentPath)
      data.append("auth",  localStorage.getItem("token"))
      axios
        .post("http://localhost:5000/fileexplorer", data)
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
            this.currentPath.pop();
            this.failed = true;
            console.log(err.response);
            this.error = err.response.data.error;
          }
        );
    },
    remove_file(filename) {
      let data = new FormData();

      data.append("directory" ,this.currentPath);
      data.append("delete_file", filename);
      data.append("auth",  localStorage.getItem("token"))
      axios
        .post("http://localhost:5000/remove_file", data)
        .then((response) => {
          console.log(response);
          this.get_files();
        })
        .catch(console.error);
    },
    mkdir(){
      console.log(this.dirname);
      if (this.dirname === "") return;
       console.log("ok")
      let data = new FormData();

      data.append("directory" ,this.currentPath);
      data.append("dirname", this.dirname);
      data.append("auth",  localStorage.getItem("token"));
      axios.post("http://localhost:5000/mkdir", data).then((response) => {
        console.log(response);
        this.get_files();
      });
      this.dirname = "";
    },
    get_download(filename) {

      let data = new FormData();

      data.append("directory" ,this.currentPath);
      data.append("download", filename);
      data.append("auth",  localStorage.getItem("token"));
      axios
        .get("http://localhost:5000/download", {
          responseType: "blob",
          params: { directory: this.currentPath, file_name: filename, auth:localStorage.getItem("token") },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "download.zip");
          document.body.appendChild(link);
          link.click();
        })
        .catch(console.error);
    },
    upload_files() {

      // was ist das problem ?
      console.log(this.files_to_upload);

      let data = new FormData();
      for (var i = 0; i < this.files_to_upload.length; i++) {
        let file = this.files_to_upload[i];
        data.append("files" + i, file);
      }
      data.append("auth",  localStorage.getItem("token"))
      data.append("directory",this.currentPath )
      axios.post("http://localhost:5000/upload", data).then((response) => {
        console.log(response);
        this.get_files();
      });
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
.fileExplorerContainer {
  padding: 16px;
}
input{
  background-color:#0077ff;
  color: black;
}
.consoleContainer {
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 600px;
}
.buttonContainer {
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
}
.fileInput {
  width: 240px;
}
</style>
