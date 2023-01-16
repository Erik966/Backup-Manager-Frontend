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
              <p>new password</p>
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
              <p>repeat new password</p>
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
                v-if="changePasswordStatusFailed"
                border="left"
                color="red"
                dense
                type="warning"
                max-width="300px"
                >{{ changePasswordFailedMessage }}</v-alert
              >
              <v-alert
                v-if="changePasswordStatusSuccess"
                border="left"
                color="green"
                dense
                type="success"
                max-width="300px"
                >Password changed succesfully.</v-alert
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
          <div class="buttonAllertContainer">
            <div id="addButton">
              <v-btn @click="addBackupServer" item.icon>
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
                >{{ addBackupServerFailedAllert }}
              </v-alert>
            </div>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <!--      <div class="pathsContainer">
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
      </div> -->
      <v-list dense rounded>
        <v-list-item v-for="item in items2" :key="item.title" link>
          <v-list-item-content @click="on_item_click(item.number)">
            <div class = "backupServerListItem">
              <div>
                <v-list-item-title>{{ item.server }}</v-list-item-title>
              </div>
              <div>
                <v-list-item-title>{{ item.path }}</v-list-item-title>
              </div>
              <div>
                <v-btn @click="removeserver(item.server)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-main>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import CryptoJS from "crypto-js";
import axios from "axios";

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
    items2: [],
    password: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
    backupServerInformations: {
      serverAddress: "",
      username: "",
      path: "",
    },
    changePasswordFailedMessage: "Something went wrong!",
    changePasswordStatusSuccess: false,
    changePasswordStatusFailed: false,
    addBackupServerFailed: false,
    addBackupServerFailedAllert: "Something went wrong!",
  }),
  mounted() {
    this.getBackupServer();
  },

  methods: {
    addBackupServer() {
      if (
        this.backupServerInformations.serverAddress == "" &&
        this.backupServerInformations.username == "" &&
        this.backupServerInformations.path == ""
      )
        return;
      let data = new FormData();

      data.append(
        "secret",
        CryptoJS.AES.encrypt(
          localStorage.getItem("username") + localStorage.getItem("key_diff"),
          localStorage.getItem("ka")
        ).toString()
      );
      data.append("username", localStorage.getItem("username"));
      data.append("host", this.backupServerInformations.serverAddress);
      data.append("username", this.backupServerInformations.username);
      data.append("path", this.backupServerInformations.path);
      data.append("auth", localStorage.getItem("token"));
      axios
        .post("http://localhost:5000//sshcheck", data)
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            "key_diff",
            CryptoJS.AES.decrypt(
              response.data.secret,
              localStorage.getItem("ka")
            ).toString(CryptoJS.enc.Utf8)
          );
          this.backupServerInformations.serverAddress = "";
          this.backupServerInformations.username = "";
          this.backupServerInformations.path = "";
          this.getBackupServer();
        })
        .catch(console.error);
    },
    removeserver(serverAddress) {
      let data = new FormData();
      data.append(
        "secret",
        CryptoJS.AES.encrypt(
          localStorage.getItem("username") + localStorage.getItem("key_diff"),
          localStorage.getItem("ka")
        ).toString()
      );
      data.append("username", localStorage.getItem("username"));
      data.append("auth", localStorage.getItem("token"));
      data.append("rmserver", serverAddress);
      axios.post("http://localhost:5000//removeserver", data).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem(
              "key_diff",
              CryptoJS.AES.decrypt(
                res.data.secret,
                localStorage.getItem("ka")
              ).toString(CryptoJS.enc.Utf8)
            );
            this.getBackupServer();
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    },
    getBackupServer() {
      let data = new FormData();
      data.append(
        "secret",
        CryptoJS.AES.encrypt(
          localStorage.getItem("username") + localStorage.getItem("key_diff"),
          localStorage.getItem("ka")
        ).toString()
      );
      data.append("username", localStorage.getItem("username"));
      data.append("auth", localStorage.getItem("token"));
      axios.post("http://localhost:5000/getbackupserver", data).then(
        (res) => {
          if (res.status === 200) {
            console.log(res.data);
            let backup = res.data.backup;
            localStorage.setItem(
              "key_diff",
              CryptoJS.AES.decrypt(
                res.data.secret,
                localStorage.getItem("ka")
              ).toString(CryptoJS.enc.Utf8)
            );
            this.items2 = [];
            for (var i = 0; i < backup.length; i++) {
              this.items2.push({
                server: backup[i]["serverAddress"],
                path: backup[i]["path"],
              });
            }
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
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
    onClickShowChangePassword() {
      this.changePasswordActive = !this.changePasswordActive;
      this.changePasswordStatusFailed = false;
      this.changePasswordStatusSuccess = false;
      this.password = [];
    },
    onClickShowAddBackupServer() {
      this.addBackupServerActive = !this.addBackupServerActive;
    },
    onPasswordChangedClick() {
      this.changePasswordStatusFailed = false;
      this.changePasswordStatusSuccess = false;
      if (this.password.newPassword === this.password.newPasswordRepeat) {
        axios
          .post("http://localhost:5000/changePassword", {
            oldPassword: this.password.oldPassword,
            newPassword: this.newPassword,
          })
          .then(
            (res) => {
              //if successfull
              if (res.status === 200) {
                console.log("200");
                this.changePasswordStatusSuccess = true;
              }
            },
            (err) => {
              console.log("401");
              console.log(err.response.data);
              this.changePasswordStatusFailed = true;
              this.changePasswordFailedMessage = "The old password is wrong.";
            }
          );
      } else {
        this.changePasswordStatusFailed = true;
        this.changePasswordFailedMessage = "New passwords do not match.";
      }
      this.password = [];
    },

    onAddedButtonClicked() {
      if (
        this.backupServerInformations.serverAddress &&
        this.backupServerInformations.username &&
        this.backupServerInformations.path
      )
        console.log("reached");
      {
        axios
          .post("http://localhost:5000/addBackupServer", {
            serverAddress: this.backupServerInformations.serverAddress,
            username: this.backupServerInformations.username,
            path: this.backupServerInformations.path,
          })
          .then(
            (res) => {
              //if successfull
              if (res.status === 200) {
                console.log("200");
              }
            },
            (err) => {
              console.log("401");
              console.log(err.response.data);
            }
          );
      }

      this.addBackupServerFailed = true;
      this.addBackupServerFailedAllert = "This server does not exist";
      this.backupServerInformations = [];

      this.memoryLocations.push({
        path: "C:/",
        icon: mdiFolder,
      });
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
.backupServerListItem{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
</style>

