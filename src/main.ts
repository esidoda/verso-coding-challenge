import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import { registerModules } from "./register-modules";
import ordersModule from "./modules/orders/index";
import productsModule from "./modules/products/index";
import router from "./router";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles/main.css';
import '@mdi/font/css/materialdesignicons.css';

registerModules({
  ordersModule: ordersModule,
  productsModule: productsModule
});

const app = createApp(App);

app.use(router);
// Pinia setup
const pinia = createPinia();
app.use(pinia);

// Vuetify setup
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  components,
  directives
});

app.use(vuetify);

app.mount("#app");
