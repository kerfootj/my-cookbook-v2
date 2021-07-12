module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended',
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
        camelcase: 'off',
        'import/extensions': 'off',
        'no-use-before-define': 'off',
        'no-unused-vars': 'warn',
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    },
};
