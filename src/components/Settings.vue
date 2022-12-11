<template>
  <v-main>
    <div class="main">
      <Navigation />

      <h1>Settings</h1>

      <v-divider></v-divider>

      <div class="settingHeadlineContainer">
        <h2 class="settingHeading">Password</h2>
        <v-btn @click="onClickShowChangePassword" item.icon>
          change password
          <v-icon class="iconPadding">{{ changePassword }}</v-icon>
        </v-btn>
      </div>

      <div class="passwordContainerWrapper" v-if="changePasswordActive">
        <div class="passwordInputFieldContainer">
          <div class="passwordBlockContainer">
            <div>
              <p>old password</p>
            </div>
            <div>
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="password.oldPassword"
              />
            </div>
          </div>
          <div class="passwordBlockContainer">
            <div>
              <p>repeat new password</p>
            </div>
            <div>
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="password.newPassword"
              />
            </div>
          </div>
          <div class="passwordBlockContainer">
            <div>
              <p>new password</p>
            </div>
            <div class="passwordBlockContainer">
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="password.newPasswordRepeat"
              />
            </div>
          </div>
          <div class="buttonAllertContainer">
            <div>
              <v-btn @click="onPasswordChangedClick" item.icon>
                change password
                <v-icon id="changePassword" class="iconPadding">{{
                  changePassword
                }}</v-icon>
              </v-btn>
            </div>
            <div>
              <v-alert
                v-if="changePasswordFailed"
                border="left"
                color="red"
                dense
                type="warning"
                max-width="300px"
                >The username or the password is incorrect.</v-alert
              >
            </div>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="settingHeadlineContainer">
        <h2 class="settingHeading">Backup- Server</h2>
        <v-btn @click="onClickShowAddBackupServer" item.icon>
          ADD
          <v-icon class="iconPadding">{{ addIcon }}</v-icon>
        </v-btn>
      </div>

      <div class="passwordContainerWrapper" v-if="addBackupServerActive">
        <div class="passwordInputFieldContainer">
          <div class="passwordBlockContainer">
            <div>
              <p>server address</p>
            </div>
            <div>
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="backupServerInformations.serverAddress"
              />
            </div>
          </div>
          <div class="passwordBlockContainer">
            <div>
              <p>username</p>
            </div>
            <div>
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="backupServerInformations.username"
              />
            </div>
          </div>
          <div class="passwordBlockContainer">
            <div>
              <p>path</p>
            </div>
            <div>
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="backupServerInformations.path"
              />
            </div>
          </div>
          <div class="passwordBlockContainer">
            <div>
              <p>port</p>
            </div>
            <div class="passwordBlockContainer">
              <input
                class="passwordInputField"
                type="text"
                name="fname"
                v-model="backupServerInformations.port"
              />
            </div>
          </div>
          <div class="buttonAllertContainer">
            <div id="addButton">
              <v-btn @click="onAddedButtonClicked" item.icon>
                add
                <v-icon id="addIcon" class="iconPadding">{{ addIcon }}</v-icon>
              </v-btn>
            </div>
            <div>
              <v-alert
                border="left"
                color="red"
                dense
                type="warning"
                max-width="300px"
                v-if="addBackupServerFailed"
                >{{addBackupServerFailedAllert}}
              </v-alert>
            </div>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

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
        <div v-if="memoryLocations.length == 0">
          <p class="hint">You have not selected any backup server yet</p>
        </div>
      </div>
      <div id="deleteButton">
        <v-btn @click="onDeleteButtonClicked" item.icon>
          delete
          <v-icon id="addIcon" class="iconPadding">{{ deleteIcon }}</v-icon>
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
import { mdiLockReset } from "@mdi/js";

export default {
  components: {
    Navigation,
  },
  data: () => ({
    addIcon: mdiTabPlus,
    folderIcon: mdiFolder,
    deleteIcon: mdiDelete,
    editIcon: mdiPencilOutline,
    changePassword: mdiLockReset,
    deleteIconsActive: false,
    changePasswordActive: false,
    addBackupServerActive: false,
    memoryLocations: [],
    password: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
    backupServerInformations: {
      serverAddress: "",
      username: "",
      path: "",
      port: "",
    },
    changePasswordFailed: false,
    addBackupServerFailed: false,
    addBackupServerFailedAllert: "something went wrong",
  }),

  methods: {
    onMemoryLocationListItemClicked() {
      console.log("hello");
    },
    onPathDeleteIconClicked(item) {
      this.memoryLocations.splice(item, 1);
    },
    onDeleteButtonClicked() {
      this.deleteIconsActive = !this.deleteIconsActive;
    },
    onClickShowChangePassword() {
      this.changePasswordActive = !this.changePasswordActive;
    },
    onClickShowAddBackupServer() {
      this.addBackupServerActive = !this.addBackupServerActive;
    },
    onPasswordChangedClick() {
      this.password = [];
      if (
        this.password.newPassword === this.password.newPasswordRepeat &&
        this.password.oldPassword === localStorage.getItem("password")
      ) {
        localStorage.setItem("password"); //TODO password local storage
      } else {
        this.changePasswordFailed = true;
      }
    },
    onAddedButtonClicked() {
      this.backupServerInformations = [];
      this.memoryLocations.push({
        path: "C:/",
        icon: mdiFolder,
      });
      this.addBackupServerFailed = true;
      this.addBackupServerFailedAllert = "This server does not exist"
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
  margin-left: 16px;
}
#deleteButton {
  padding-top: 24px;
}
#changePassword {
  padding-left: 16px;
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
.passwordInputFieldContainer {
  padding: 32px;
  min-width: calc(30% + 64px);
  background-color: #222222; /* selbe Farbe wie oben!*/
  border-radius: 4px;
}
.passwordContainerWrapper {
  margin: 16px 0px 48px 0px;
  display: flex;
  justify-content: center;
}
.passwordBlockContainer {
  display: flex;
  justify-content: space-between;
}
.settingHeadlineContainer {
  margin: 32px;
  display: flex;
  justify-content: left;
  flex-direction: row;
}
.settingHeading {
  margin-right: 32px;
}
.hint {
  color: #504e31;
  padding: 32px;
  font-size: 24px;
}
.iconPadding {
  padding-left: 8px;
}
.buttonAllertContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 24px;
  gap: 8px;
}
</style>

// wichtige Quelle: https://www.youtube.com/watch?v=8EcBJV0sOSU // Doku: mit
window.showDirectoryPicker() | Das wählen eines Pfades über das File System
scheint keinen Sinn zu ergeben das man den ganzen Pfad über dem gewählten
directory aus Sicherheitsgründen bei einer Webapp nicht eisehen darf ... // Des
weiteren ist Window.showDirectoryPicker() für z.B. Firerfox Safari und Chrome
Mobile nicht kompatibel // Auch andere HTML/JavaScript Lösungen funktionieren
aus Sicherheitsgründen nicht:
https://stackoverflow.com/questions/2809688/directory-chooser-in-html-page/2809706#2809706
// FileSystemDirectoryEntry.getDirectory([path][, options][, successCallback][,
errorCallback]); // path Optional Either an absolute path or a path relative to
the directory on which the method is called, describing which directory entry to
return. Absolute paths may not be able to be used, !!for security reasons!!. //
https://reference.codeproject.com/dom/filesystemdirectoryentry/getdirectory
window.open("C:/"); console.log("idk wie wir es machen sollen"); // example to
test this.memoryLocations.push({ path: "C:/", icon: mdiFolder, bei den settings
macht es sinn change password und add backup server mit einem builder also eienr
component zu machen da sie beide gleich aufgebaut sind somit erreichen wir
bessere erweiterbarkeit, bessere Übersichtlichkeit, und besserere Trennung
(Modularisierung)
