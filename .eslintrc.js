module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "cypress/globals": true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier',
    'cypress'
  ],
  // add your custom rules here
  rules: {
    curly: 'off',
    'no-useless-catch': 'off'
  }
}
