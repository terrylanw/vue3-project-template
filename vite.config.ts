import path from 'node:path'
import { type PluginOption, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { checker } from 'vite-plugin-checker'

function setupPlugins(isBuild: boolean): PluginOption[] {
  const plugins: PluginOption = [
    vue(),
  ]

  !isBuild && (plugins.push(checker({ vueTsc: true })))

  return plugins
}

export default defineConfig(({ command }) => {
  // const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  const isBuild = command === 'build'

  return {
    resolve: {
      alias: {
        '@': path.resolve(path.resolve(), 'src'),
      },
    },
    plugins: setupPlugins(isBuild),
    server: {
      host: '0.0.0.0',
      port: 9000,
      open: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import \'./src/style/index.scss\';',
        },
      },
    },
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        external: ['/config/env.js'],
      },
    },
  }
})
