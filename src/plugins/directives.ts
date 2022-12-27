import { App } from 'vue';

import { permission } from '@/directives/permission';
import copy from '@/directives/copy';
import debounce from '@/directives/debounce';
import throttle from '@/directives/throttle';
import draggable from '@/directives/draggable';

/**
 * 
 * @param app
 */
export function setupDirectives(app: App) {
  app.directive('permission', permission);
  app.directive('copy', copy);
  app.directive('debounce', debounce);
  app.directive('throttle', throttle);
  app.directive('draggable', draggable);
}
