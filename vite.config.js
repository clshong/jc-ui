import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // 配置别名指向src目录
      "@": resolve(__dirname, "src"),
    },
    // 使用别名的文件后缀
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  server: {
    open: true,
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      // "/api": {
      //   target: "http://localhost:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },

  }
})
