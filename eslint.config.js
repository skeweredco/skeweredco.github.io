import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '.env',
      '.env.development.local',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'writable',
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'error',
      'no-undef': ['error', { typeof: false }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    },
    settings: { react: { version: 'detect' } },
  },
];
