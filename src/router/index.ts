import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouterMap } from '@/config/router.config';
// const originalPush: any = VueRouter.prototype.push
// // @ts-ignore
// VueRouter.prototype.push = function push(location: any, onResolve: any, onReject: any) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch((err: any) => err)
// }

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => { y: 0 },
  routes: constantRouterMap,
});
