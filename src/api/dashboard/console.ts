import { http } from '@/utils/http/axios';
export function getConsoleInfo() {
  return http.request({
    url: '/dashboard/console',
    method: 'get',
  });
}
