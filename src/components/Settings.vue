<template>
  <v-main>
    <Navigation />
    <h1 align>Settings</h1>
    <div class="btnsContainer">
      <div id="addButton">
        <v-btn @click="onAddedButtonClicked" item.icon>
          add <v-icon id="addIcon">{{ addIcon }}</v-icon>
        </v-btn>
      </div>
      <div id="addInputField">
        <input id="pathInputField" type="text" name="fname" />
      </div>
    </div>
    <div class="pathsContainer">
      <v-list dense rounded>
        <v-list-item v-for="item in memoryLocations" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ folderIcon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.path }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon v-if="deleteIconsActive">
            <v-icon id="deleteIcon" @click="onPathDeleteIconClicked(item)">{{
              deleteIcon
            }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </div>
    <div>
      <v-btn @click="onDeleteButtonClicked" item.icon>
        Delete <v-icon id="addIcon">{{ deleteIcon }}</v-icon>
      </v-btn>
    </div>
  </v-main>
</template>

<script>
import Navigation from "../components/Navigation.vue";

import { mdiTabPlus } from "@mdi/js";
import { mdiFolder } from "@mdi/js";
import { mdiDelete } from "@mdi/js";

export default {
  components: {
    Navigation,
  },
  data: () => ({
    addIcon: mdiTabPlus,
    folderIcon: mdiFolder,
    deleteIcon: mdiDelete,
    deleteIconsActive: false,
    memoryLocations: [],
  }),
  methods: {
    async onAddedButtonClicked() {
      // wichtige Quelle: https://www.youtube.com/watch?v=8EcBJV0sOSU

      // Doku: mit window.showDirectoryPicker() | Das wählen eines Pfades über das File System scheint keinen Sinn zu ergeben das man den ganzen Pfad über dem gewählten directory aus Sicherheitsgründen bei einer Webapp nicht eisehen darf ...
      // Des weiteren ist Window.showDirectoryPicker() für z.B. Firerfox Safari und Chrome Mobile nicht kompatibel
      // Auch andere HTML/JavaScript Lösungen funktionieren aus Sicherheitsgründen nicht: https://stackoverflow.com/questions/2809688/directory-chooser-in-html-page/2809706#2809706
      // FileSystemDirectoryEntry.getDirectory([path][, options][, successCallback][, errorCallback]);
      // path Optional Either an absolute path or a path relative to the directory on which the method is called, describing which directory entry to return. Absolute paths may not be able to be used, !!for security reasons!!.
      // https://reference.codeproject.com/dom/filesystemdirectoryentry/getdirectory

      window.open("C:/");
      console.log("idk wie wir es machen sollen");

      // example to test
      this.memoryLocations.push({
        path: "C:/",
        icon: mdiFolder,
      });
    },
    onPathDeleteIconClicked(item) {
      this.memoryLocations.splice(item, 1);
    },
    onDeleteButtonClicked() {
      this.deleteIconsActive = !this.deleteIconsActive;
    },
  },
};
</script>

<style>
.pathsContainer {
  min-height: 600px;
  padding: 0 16px 0 16px;
}
.btnsContainer {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 16px;
}
#addIcon {
  margin-left: 16px;
  scale: 1;
}
#deleteIcon {
  color: red;
}
#pathInputField {
  margin-left: 16px;
  background-color: #eeeeee;
  border-radius: 2px;
  height: 32px;
  width: calc(100% - 16px);
}
#addButton{
}
#addInputField{
  flex-grow: 10;
}
</style>
