import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import googleAPIKey from "./apiKey.js";

Vue.use(VueGoogleMaps, {
  load: {
    key: googleAPIKey,
    libraries: "places"
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
