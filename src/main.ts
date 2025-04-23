import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { registerModules } from "./register-modules";
import ordersModule from "./modules/orders/index";
import router from "./router";

registerModules({
  ordersModule: ordersModule,
});

const app = createApp(App);

console.log('router', router.getRoutes());
app.use(router);
// Pinia setup
const pinia = createPinia();
app.use(pinia);

// Vuetify setup
const vuetify = createVuetify();
app.use(vuetify);



app.mount("#app");
