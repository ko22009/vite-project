import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,js,jsx,vue}'],
    ignores: ['dist'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/no-reserved-component-names': 'off',
    },
  },
  {
    ignores: [
      'src/api/api.types.ts',
      'tailwind.config.js',
      'postcss.config.js',
    ],
  },
  eslintConfigPrettier
);
