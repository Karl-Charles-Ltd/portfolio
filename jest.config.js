module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'html'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
    'vee-validate/dist/rules': 'babel-jest',
  },
  roots: ['<rootDir>/', '<rootDir>/test/'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/filters/**/*.vue',
    '<rootDir>/directives/**/*.vue',
    '<rootDir>/helpers/**/*.vue',
    '<rootDir>/modules/**/*.vue',
    '<rootDir>/utilities/**/*.vue',
  ],
  setupFilesAfterEnv: ['./test/index.ts', 'jest-extended'],
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules)'],
  testPathIgnorePatterns: ['<rootDir>/cypress/integration/*.spec.js'],
  modulePathIgnorePatterns: ['<rootDir>/cypress/integration/*'],
};
