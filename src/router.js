export default function (router) {
  if (!localStorage) return;
  router.beforeEach((to, from , next) => {
    const pw = localStorage.getItem('pw');
    if (pw === null && to.path !== '/') {
      next('/');
    } else {
      next();
    }
  })
}