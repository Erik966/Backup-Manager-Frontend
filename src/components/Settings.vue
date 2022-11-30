<template>
  <v-main>
    <Navigation />
    <h1 align>Settings</h1>
    <div class="btnsContainer">
      <div>
        <v-btn @click="onAddedButtonClicked" item.icon>
          add <v-icon id="addIcon">{{ addIcon }}</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn @click="onDeleteButtonClicked" item.icon>
          Delete <v-icon id="addIcon">{{ deleteIcon }}</v-icon>
        </v-btn>
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

      const filePath = await window.showDirectoryPicker();


      window.open("C:/");
      console.log(filePath);

      // example to test
     /*  this.memoryLocations.push({
        path: "C:/",
        icon: mdiFolder,
      }); */
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
  justify-content: space-between;
  padding: 16px;
}
#addIcon {
  padding-left: 16px;
  scale: 1;
}
#deleteIcon {
  color: red;
}
</style>
