import { Configuration } from '@nuxt/types/config';
import head from './config/head';

require('dotenv').config();

const apiUseHttps = ((process.env.API_HTTPS && process.env.API_HTTPS) || '').toLowerCase() !== 'false';
let debugLevel = process.env.DEBUG_LEVEL;

if (!debugLevel) debugLevel = process.env.NODE_ENV === 'development' ? 'info' : 'error';

// @ts-ignore
const nuxtConfig: Configuration = {
  mode: 'universal',
  head,
  env: {
    debugLevel,
    debugAxiosVerbose: process.env.DEBUG_AXIOS_VERBOSE || 'false',
  },
  loading: { color: '' },
  css: ['assets/scss/app.scss'],
  buildModules: [
    ['@nuxt/typescript-build', { typeCheck: process.env.NODE_ENV === 'development' }],
    ['@nuxtjs/stylelint-module', { syntax: 'scss' }],
    ['@nuxtjs/eslint-module', { configFile: './.eslintrc.js' }],
    ['@nuxtjs/dotenv', { filename: '.env' }],
  ],
  modules: [
    // '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/auth',
    '@nuxtjs/sentry',
    '@nuxtjs/style-resources',
    '@nuxtjs/universal-storage',
  ],
  styleResources: {
    scss: ['~/assets/scss/settings-tools.scss', '~/assets/scss/generic/generic.scss'],
  },
  plugins: ['~/plugins/global-components.js'],
  axios: {
    https: apiUseHttps,
  },
  // auth: {
  //   redirect: {
  //     home: false,
  //   },
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/auth/login', method: 'post', propertyName: 'data.token.accessToken' },
  //         user: { url: 'auth/user', method: 'get', propertyName: 'data.user' },
  //         logout: { url: 'auth/logout', method: 'post' },
  //       },
  //     },
  //   },
  // },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    disabled: process.env.ENVIRONMENT === 'development',
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
      vue: {
        transformAssetUrls: {
          audio: 'src',
          source: 'src',
        },
      },
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
    extend(config, ctx) {
      if (ctx.isDev) {
        // Allow nicer debugging for the SSR parts of the app by inlining the source maps
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
  },
};

export default nuxtConfig;
