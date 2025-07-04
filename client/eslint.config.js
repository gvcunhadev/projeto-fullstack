import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    
    languageOptions: {
      globals: {
        ...globals.browser, 
        ...globals.node,    
      },
      parserOptions: {
        ecmaVersion: 12, 
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, 
        },
      },
    },

    ignores: ['build/', 'dist/', 'node_modules/'],
    settings: {
      react: {
        version: 'detect', 
      },
    },
  },


  ...tseslint.configs.recommended,


  pluginReact.configs.recommended,


  pluginReactHooks.configs.recommended,


  pluginJsxA11y.configs.recommended,

  
  pluginPrettier,

 
  {
    rules: {
     
      'react/react-in-jsx-scope': 'off',
     
      'react/prop-types': 'off',
    
    },
  },
];