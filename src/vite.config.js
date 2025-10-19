import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from 'vite-plugin-html';

// 客户端构建配置
const clientConfig = {
  base: "./",
  build: {
    outDir: '../dist',
    emptyOutDir: true, // 确保每次构建都清空输出目录
    rollupOptions: {
      input: './index.html',
      output: {
        dir: '../dist',
        entryFileNames: 'entry-client.js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        format: 'iife',
        name: 'TodoApp'
      }
    }
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [VantResolver()],
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'SSR TodoList',
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    }
  }
};

// 服务端构建配置  
const serverConfig = {
  base: "./",
  build:{
    outDir:'../dist',
    ssr:true,
    emptyOutDir: false, // 服务端构建不要清空目录，避免覆盖客户端构建结果
    rollupOptions: {
      input : {
        'entry-server': './entry-server.ts'
      },
      output: {
        dir:'../dist',
        entryFileNames:'[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    }
  }
};

export default defineConfig(({ mode }) => {
  return mode === 'client' ? clientConfig : serverConfig;
});