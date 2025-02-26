import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueTheMask from "vue-the-mask";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const app = createApp(App);

app.use(VueTheMask);
app.use(router);

app.mount("#app");
