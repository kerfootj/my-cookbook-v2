module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.ts', '.tsx'],
            },
        },
    },
    rules: {
        '@typescript-eslint/no-use-before-define': ['error', {}],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        camelcase: 'off',
    },
    ignorePatterns: ['next.config.*'],
};
