module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
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
    'no-unused-vars': [
      'warn',
      {
        'args': 'none',
      },
    ],
    'arrow-parens': [
      'warn',
      'always',
    ],
    'func-style': [
      'warn',
      'expression',
    ],
    'no-unsafe-finally': 'off',
    'react/prop-types': 'off',
  },
};
