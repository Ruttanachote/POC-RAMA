import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface Meta {
  title: string;
  ignoreAuth?: boolean;
  permissions?: string[];
  noKeepAlive?: boolean;
  affix?: boolean;
  icon?: string;
  frameSrc?: string;
  externalLink?: string;
  hidden?: boolean;
}

export interface Menu {
  title: string;
  label: string;
  key: string;
  meta: RouteMeta;
  name: string;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  icon?: any;
  path: string;
  permissions?: string[];
  redirect?: string;
  sort?: number;
}
