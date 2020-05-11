# karl-charles-ltd-portfolio

> Karl Charles Ltd NuxtJS &amp; NodeJS Portfolio

## Project configuration
### **Sentry**
`.sentryclicr`:
```text
[defaults]
org = <your-sentry-organisation-name>
project = <your-sentry-project-name>
```

**Usage:**
```vue
this.$sentry.captureException(new Error('example')) || this.$sentry.captureException(new Error(error));
```

##
### Environment
`cp .env.example .env` - Then change details accordingly

##

## Build script setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# generate state project with sentry log
$ yarn dist

# lint the projects code
$ yarn lint

# test the projects code
$ yarn test
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
