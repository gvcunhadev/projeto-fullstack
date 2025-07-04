import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: { globals: globals.node },
    ignores: ['dist/', 'node_modules/'],
  },

  ...tseslint.configs.recommended,

  pluginPrettier,
];