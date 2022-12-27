import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { Settings } from '@vicons/ionicons5';
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
    path: '/การตั่งค่า',
    name: 'การตั่งค่า',
    redirect: '/การตั่งค่า',
    component: Layout,
    meta: {
      title: 'การตั่งค่า',
      icon: renderIcon(Settings),
      sort: 6,
    },
    children: [],
  },
];

export default routes;
