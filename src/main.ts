import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import VueTheMask from 'vue-the-mask';
import ToastPlugin from 'vue-toast-notification';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Collapse from 'bootstrap/js/dist/collapse';

const app = createApp(App);

app.use(VueTheMask);
app.use(ToastPlugin);
app.use(router);

app.mount('#app');
