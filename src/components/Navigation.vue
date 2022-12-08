<template>
  <div></div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense rounded>
        <v-list-item
          v-for="item in routingItems"
          :key="item.title"
          link
          @click="on_menu_item_click(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!--  -->
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Backup Manager</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mdiFolder } from "@mdi/js";
import { mdiCogOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";

export default {
  data: () => ({
    drawer: null,
    routingItems: [
      { title: "File Explorer", icon: mdiFolder },
      { title: "Settings", icon: mdiCogOutline },
      { title: "Logout", icon: mdiLogout },
    ],
  }),
  methods: {
    on_menu_item_click(routingItemName) {
      // TODO: sehr schlecht, dass secure eigentlich fileExplorer ist ( umbenennen ?)
      if (routingItemName.toLowerCase() != this.$router.currentRoute.name) {
        switch (routingItemName) {
          case "File Explorer":
            this.$router.push("/secure");
            break;
          case "Settings":
            this.$router.push("/settings");
            break;
          case "Logout":
            localStorage.removeItem("token");
            this.$router.push("/");
            break;
        }
      }
    },
  },
};
</script>
