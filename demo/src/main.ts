import * as Vue from "vue";
import App from "./App.vue";
import Player from "../../src/main";
import axios from "axios";
import VueAxios from "vue-axios";

const app = Vue.createApp(App).use(Player);
app.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost";

const token = localStorage.getItem("token") || "";
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

app.mount("#app");
