import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { rootRoute } from './base'

// 普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [rootRoute]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App) {
  app.use(router)

  // 创建路由守卫
  // createRouterGuards(router)

  await router.isReady()
}
