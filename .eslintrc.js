const mode = process.env.NODE_ENV || 'development';
module.exports = {
  extends: ['next', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    '@next/next/no-img-element': 0,
    'react/no-unescaped-entities': 1,
    'react-hooks/rules-of-hooks': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    //"no-unused-vars": ["error", { "ignoreRestSiblings": true }]
    // 'no-console': mode === 'production' ? 'error' : 'warn',
    // 'no-debugger': mode === 'production' ? 'error' : 'off',
  },
};
