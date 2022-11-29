<template>
  <v-app>
    <Navigation />
    <v-main class="mainContainer">
      <h1 align>Settings</h1>
      <v-list dense rounded>
        <v-list-item v-for="item in memoryLocations" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <!--         <v-list-item-content>
          <v-list-item-title @click="on_item_click(item.number)">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content> -->
        </v-list-item>
      </v-list>
      <v-btn @click="onAddedButtonClicked"> </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  data: () => ({
    memoryLocations: [],
  }),
  methods: {
    onAddedButtonClicked() {
      console.log("FilePath zum adden auswählen");
    },
  },
};
</script>

<style>
.mainContainer{
    display: flex;
  align-items: center;
  justify-content: center;
}
</style>
