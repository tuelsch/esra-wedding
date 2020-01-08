// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/styles/_index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import routes from '~/router';

export default function (Vue, { router, head, isClient }) {
  routes(router, isClient)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
