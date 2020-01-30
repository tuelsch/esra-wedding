// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/styles/_index.scss";
import Vuex from "vuex";
import DefaultLayout from "~/layouts/Default.vue";
import routes from "~/router";
import createStore from "~/store";

export default function(Vue, { router, head, isClient, appOptions }) {
  // Import client libraries
  if (isClient) {
    import("~/modules/placeholder-shown");
  }

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  // Vuex
  Vue.use(Vuex);
  const store = createStore(isClient);
  appOptions.store = store;

  // Router
  routes(router, isClient, store);
}
