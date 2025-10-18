import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';

// 客户端构建配置
const clientConfig = {
  base: "./",
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: './entry-client.ts',
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