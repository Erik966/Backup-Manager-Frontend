<template>
  <v-main>
    <div class="main">
      <Navigation />
      <h1 align>Settings</h1>

      <h3>Change Password:</h3>
      <div id="passwordContainerWrapper">
        <div id="passwordInputFieldContainer">
          <div class="passwordBlockContainer">
            <div>
              <div>
                <p>old Password</p>
              </div>
              <div>
                <p>repeat new Password</p>
              </div>
              <div>
                <p>new Password</p>
              </div>
            </div>
            <div>
              <div>
                <input class="passwordInputField" type="text" name="fname" />
              </div>
              <div class="passwordBlockContainer">
                <input class="passwordInputField" type="text" name="fname" />
              </div>
              <div class="passwordBlockContainer">
                <input class="passwordInputField" type="text" name="fname" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btnsContainer">
        <div id="addInputField">
          <input id="pathInputField" type="text" name="fname" />
        </div>
        <div id="addButton">
          <v-btn @click="onAddedButtonClicked" item.icon>
            add <v-icon id="addIcon">{{ addIcon }}</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="pathsContainer">
        <v-list dense rounded>
          <v-list-item
            @click="onMemoryLocationListItemClicked"
            v-for="item in memoryLocations"
            :key="item.title"
            link
          >
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
            <v-icon id="editIcon">{{ editIcon }}</v-icon>
          </v-list-item>
        </v-list>
      </div>
      <div id="deleteButton">
        <v-btn @click="onDeleteButtonClicked" item.icon>
          delete <v-icon id="addIcon">{{ deleteIcon }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-main>
</template>

<script>
import Navigation from "../components/Navigation.vue";

import { mdiTabPlus } from "@mdi/js";
import { mdiFolder } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { mdiPencilOutline } from "@mdi/js";

export default {
  components: {
    Navigation,
  },
  data: () => ({
    addIcon: mdiTabPlus,
    folderIcon: mdiFolder,
    deleteIcon: mdiDelete,
    editIcon: mdiPencilOutline,
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
    onMemoryLocationListItemClicked() {
      console.log("hello");
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
  height: 400px;
  overflow-y: auto;
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
  border-radius: 4px;
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding-left: 40px;
  height: 32px;
  width: calc(100% - 32px);
}
.passwordInputField {
  margin: 8px 0px 8px 0px;
  border-radius: 4px;
  background-color: white;
  padding-left: 8px;
  background-position: 10px 10px;
  height: 32px;
  width: calc(100%);
}
#deleteButton {
  padding-left: 16px;
  padding-top: 24px;
}
#addInputField {
  flex-grow: 10;
}
.main {
  padding: 16px;
}
#editIcon {
  margin-left: 16px;
}
#passwordInputFieldContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 220px);
}
#passwordContainerWrapper {
  display: flex;
  justify-content: space-evenly;
}
.passwordBlockContainer {
  display: flex;
}
</style>
