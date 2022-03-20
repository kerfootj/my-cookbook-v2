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
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
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
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false },
        ],
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-nested-ternary': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',
        camelcase: 'off',
    },
    ignorePatterns: ['next.config.*'],
};
