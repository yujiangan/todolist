import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
// import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import vueEslintParser from "vue-eslint-parser";

export default defineConfig([
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue,ts,tsx}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: "latest", 
        sourceType: "module",
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      // 添加 TypeScript 推荐规则
      ...typescriptEslintPlugin.configs.recommended.rules,
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
]);
