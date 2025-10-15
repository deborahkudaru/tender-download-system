import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "primeicons/primeicons.css";
import { createPinia } from "pinia";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

app.mount("#app");
