module.exports = {
   'env': {
      'browser': true,
      'es2021': true,
      'node': true
   },
   'extends': [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/jsx-runtime'
   ],
   'overrides': [
   ],
   'parser': '@typescript-eslint/parser',
   'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module'
   },
   'plugins': [
      'react',
      '@typescript-eslint'
   ],
   'rules': {
      'indent': [
         'error',
         3,
         {SwitchCase: 1}
      ],
      'linebreak-style': [
         'error',
         'windows'
      ],
      'quotes': [
         'error',
         'single'
      ],
      'semi': [
         'error',
         'always'
      ],
      '@typescript-eslint/ban-ts-comment': 'off'
   }
};
