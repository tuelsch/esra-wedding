export default function(router, isClient, store) {
  if (!isClient) return;
  router.beforeEach((to, from, next) => {
    if (store.state.mode === null && to.path !== "/") {
      next("/");
    } else {
      next();
    }
  });
}
