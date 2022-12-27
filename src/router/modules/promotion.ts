import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { Pricetags } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

/**
 * @param name
 * @param meta
 * @param redirect
 * @param meta.disabled
 * @param meta.title
 * @param meta.icon
 * @param meta.keepAlive
 * @param meta.sort
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/promotion',
    name: 'promotion',
    redirect: '/promotion',
    component: Layout,
    meta: {
      title: 'โปรโมชั่นของฉัน',
      icon: renderIcon(Pricetags),
      sort: 5,
    },
    children: [],
  },
];

export default routes;
