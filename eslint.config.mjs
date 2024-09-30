import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'warn',
      semi: ['error', 'always'],
      'no-extra-semi': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'no-console': 'warn',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
      camelcase: 'error',
    },
  },
];
