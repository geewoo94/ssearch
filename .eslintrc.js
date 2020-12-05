module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'semi': [
      'warn',
      'always',
    ],
    'quotes': [
      'warn',
      'single',
    ],
    'eol-last': [
      'warn',
      'always',
    ],
    'arrow-parens': [
      'warn',
      'always',
    ],
    'no-unsafe-finally': 'off',
    'react/prop-types': 'off',
  },
  'globals': {
    'chrome': true
  }
};
