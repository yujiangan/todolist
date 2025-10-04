import pluginJs from '@eslint/js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

// ES模块中获取当前目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  // 配置要检查的文件
  {
    files: ['**/*.{ts,mts}'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        // 明确包含src目录下的文件
        createDefaultProgram: true,
      },
      // 定义Node.js全局变量
      globals: {
        process: 'readonly',
        console: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      // 自定义规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-undef': 'error',
    },
  },

  // 忽略不需要检查的文件
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'eslint.config.js'],
  },

  // Prettier配置
  {
    files: ['**/*.{ts,mts}'],
    rules: {
      // 禁用与Prettier冲突的格式化规则
      'semi': 'off',
      'quotes': 'off',
      'indent': 'off',
      'space-before-function-paren': 'off',
      'comma-dangle': 'off',
      'arrow-parens': 'off',
    },
  },
];