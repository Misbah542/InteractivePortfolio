module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.js', 'vite.config.js', 'tailwind.config.js'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    settings: {
      react: {
        version: '18.2'
      }
    },
    plugins: ['react-refresh'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never']
    }
  };