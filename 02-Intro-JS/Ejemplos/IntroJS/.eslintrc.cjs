module.exports = {
  root: true,
  extends: ['standard', 'prettier'],
  parserOptions: {
    'ecmaVersion': 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/require-default-prop': 'off',
    // 'vue/multi-word-component-names': 0, // disable this rule just for views
    // 'vue/script-setup-uses-vars': 'error',
    // 'vue/no-unused-vars': 'error',
    // 'no-unused-vars': 'error',
    'prefer-template': 'error', // si solo permitimos una:  "prefer-template": [true, "allow-single-concat"]
    // Me organiza los imports
    // 'sort-imports': [
    //   'error',
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //     allowSeparatedGroups: false,
    //   },
    // ],
  }
}
