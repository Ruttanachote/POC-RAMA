import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { Card } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'dashboard';

/**
 * @param name
 * @param meta
 * @param redirect
 * @param meta.disabled
 * @param meta.title
 * @param meta.icon
 * @param meta.keepAlive
 * @param meta.sort
 * */
const routes: Array<RouteRecordRaw> = [
  {
    
    path: '/dashboards',
    name: routeName,
    redirect: '/dashboard/ข้อมูลบัตร',
    component: Layout,
    meta: {
      title: 'บัตร ของฉัน',
      icon: renderIcon(Card),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'บัญชีส่วนตัว',
        name: `${routeName}_บัญชีส่วนตัว`,
        meta: {
          title: 'บัญชีส่วนตัว',
          permissions: ['dashboard_monitor'],
        },
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
      {
        path: 'ข้อมูลบัตร',
        name: `${routeName}_ข้อมูลบัตร`,
        meta: {
          title: 'ข้อมูลบัตร',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/monitor/monitor.vue'),
      },
      {
        path: 'โปรไฟล์',
        name: `${routeName}_โปรไฟล์`,
        meta: {
          title: 'โปรไฟล์',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/monitor/profile.vue'),
      },
      {
        path: 'Table',
        name: `${routeName}_Table`,
        meta: {
          title: 'Table',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/monitor/table.vue'),
      },
      {
        path: 'List',
        name: `${routeName}_List`,
        meta: {
          title: 'List',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/console/console2.vue'),
      },
      {
        path: 'workplace',
        name: `${routeName}_point`,
        meta: {
          title: 'คะเเนน',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        children: [
          {
            path: 'เเลกคะเเนน',
            name: `${routeName}_เเลกคะเเนน`,
            meta: {
              title: 'เเลกคะเเนน',
              permissions: ['dashboard_monitor'],
            },
            component: () => import('@/views/dashboard/monitor/monitor.vue')
          },
          {
            path: 'โอนคะเเนน',
            name: `${routeName}โอนคะเเนน`,
            meta: {
              title: 'โอนคะเเนน',
              keepAlive: true,
              permissions: ['dashboard_workplace'],
            },
            component: () => import('@/views/dashboard/monitor/emty.vue')
          },
        ],
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
      {
        path: 'ผ่อนชำระ',
        name: `${routeName}_ผ่อนชำระ`,
        meta: {
          title: 'ผ่อนชำระ',
          permissions: ['dashboard_monitor'],
        },
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
      {
        path: 'บริการหักค่าใช้จ่ายอัตโนมัติ',
        name: `${routeName}_บริการหักค่าใช้จ่ายอัตโนมัติ`,
        meta: {
          title: 'บริการหักค่าใช้จ่ายอัตโนมัติ',
          permissions: ['dashboard_monitor'],
        },
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
      {
        path: 'ชำระค่าบัตร',
        name: `${routeName}_ชำระค่าบัตร`,
        meta: {
          title: 'ชำระค่าบัตร',
          permissions: ['dashboard_monitor'],
        },
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: 'ตั่งค่าบัตร',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        children: [
          {
            path: 'ตั้งค่าการใช้งาน',
            name: `${routeName}_ตั้งค่าการใช้งาน`,
            meta: {
              title: 'ตั้งค่าการใช้งาน',
              permissions: ['dashboard_monitor'],
            },
            component: () => import('@/views/dashboard/monitor/emty.vue')
          },
          {
            path: 'ช่องทางการรับใบเเจ้งยอด',
            name: `${routeName}_ช่องทางการรับใบเเจ้งยอด`,
            meta: {
              title: 'ช่องทางการรับใบเเจ้งยอด',
              keepAlive: true,
              permissions: ['dashboard_workplace'],
            },
            component: () => import('@/views/dashboard/monitor/emty.vue')
          },
        ],
        component: () => import('@/views/dashboard/monitor/emty.vue')
      },
    ],
  },
];

export default routes;
