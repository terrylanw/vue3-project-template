import type { App } from 'vue'
import { createPinia } from 'pinia'

export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}

/* 模块导出 */
export * from './modules/app'
