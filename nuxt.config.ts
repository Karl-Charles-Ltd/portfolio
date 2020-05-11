import { Configuration } from '@nuxt/types/config';
import head from './config/head';

require('dotenv').config();

// @ts-ignore
const nuxtConfig: Configuration = {
  mode: 'universal',
  head,
  loading: { color: '' },
  css: ['assets/scss/app.scss'],
  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/stylelint-module', { syntax: 'scss' }],
    ['@nuxtjs/eslint-module', { configFile: './.eslintrc.js' }],
    ['@nuxtjs/dotenv', { filename: '.env' }],
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/sentry',
    '@nuxtjs/style-resources',
    '@nuxtjs/universal-storage',
  ],
  styleResources: {
    scss: ['assets/scss/settings-tools.scss'],
  },
  plugins: [],
  axios: {
    https: process.env.API_HTTPS || false,
  },
  auth: {
    redirect: {
      home: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'data.token.accessToken' },
          user: { url: 'auth/user', method: 'get', propertyName: 'data.user' },
          logout: { url: 'auth/logout', method: 'post' },
        },
      },
    },
  },
  sentry: {
    dsn: 'https://6f22d580be1640ada4ebe0b09614a759@o391085.ingest.sentry.io/5236626',
    disabled: false,
    config: { logError: true },
  },
  typescript: {
    typeCheck: {
      eslint: true,
    },
  },
  render: {
    bundleRenderer: {
      // See: https://ssr.vuejs.org/api/#shouldpreload
      shouldPreload: (file, type) => {
        if (type === 'script' || type === 'style') {
          return true;
        }
        if (type === 'font') {
          return /\.woff2$/.test(file); // only preload woff2 fonts as they are the most common
        }
        return false;
      },
    },
  },
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
    transpile: ['vee-validate/dist/rules'],
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ];
      },
    },
    // @ts-ignore
    extend(config, ctx) {
      if (ctx.isDev) {
        // Allow nicer debugging for the SSR parts of the app by inlining the source maps
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
};

export default nuxtConfig;
