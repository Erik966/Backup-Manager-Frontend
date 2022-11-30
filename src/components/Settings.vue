<template>
  <v-main>
    <Navigation />
    <h1 align>Settings</h1>
    <v-div class="btnsContainer">
      <v-div>
        <v-btn @click="onAddedButtonClicked" item.icon>
          add <v-icon id="addIcon">{{ addIcon }}</v-icon>
        </v-btn>
      </v-div>
      <v-div>
        <v-btn @click="onDeleteButtonClicked" item.icon>
          Delete <v-icon id="addIcon">{{ deleteIcon }}</v-icon>
        </v-btn>
      </v-div>
    </v-div>
    <v-div class="pathsContainer">
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
    </v-div>
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
    onAddedButtonClicked() {
      // TODO: permissions geben (Not allowed to load local resource:)
      window.open("C:/");
      console.log("FilePath zum adden auswählen");

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
  height: 100px;
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
