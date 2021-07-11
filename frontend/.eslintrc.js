module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
  },
};
