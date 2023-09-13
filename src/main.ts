import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import './style/tailwindcss.scss'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  // 添加 meta 标签，用于处理使用 Naive UI 和 Tailwind CSS 时的样式覆盖问题
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app')
}

bootstrap()
