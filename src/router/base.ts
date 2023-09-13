import type { RouteRecordRaw } from 'vue-router'

export const rootRoute: RouteRecordRaw = {
  path: '/',
  component: () => import('@/views/home/home.vue'),
}
