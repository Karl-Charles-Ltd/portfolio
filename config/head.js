const title = 'Karl Charles Ltd | KC Creative Engineer | KC Creative Software Engineer';
const description =
  'A Full-stack software engineer dedicated to creating captivating apps that express your brands image.';
const imageAlt = "'Technology is a bit less daunting when it's done correct'";
const appName = 'KC Creative Engineer';
const themeColor = ''; // @todo Add a theme color to the config/head.js file.

const head = {
  title,
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://karlcharles.co.uk',
    },
    {
      property: 'og:image',
      content: '', // @todo Add the 'og:image' property to the config/head.js file.
    },
    {
      property: 'og:image:alt',
      content: imageAlt,
    },
    {
      property: 'og:locale',
      content: 'en_UK',
    },
    {
      name: 'twitter:image',
      content: '', // @todo Add the 'twitter:image' property to the config.head.js file.
    },
    {
      name: 'twitter:image:alt',
      content: imageAlt,
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'application-name',
      content: appName,
    },
    {
      name: 'apple-mobile-web-app-title',
      content: appName,
    },
    {
      name: 'theme-color',
      content: themeColor,
    },
    {
      name: 'msapplication-navbutton-color',
      content: themeColor,
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'msapplication-starturl',
      content: '/?utm_source=homescreen',
    },
  ],
  link: [
    // {
    //   rel: 'icon',
    //   type: 'image/png',
    //   sizes: '72x72',
    //   href: '/favicons/icon-72x72.png'
    // },
    // {
    //   rel: 'apple-touch-icon',
    //   type: 'image/png',
    //   sizes: '72x72',
    //   href: '/favicons/icon-72x72.png',
    // },
    // @todo Create and complete all favicons in the config/head.js file.
    // @todo Favicon sizes needed: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
    {
      href:
        'https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Press+Start+2P&display=swap',
      rel: 'stylesheet',
    },
  ],

  script: [
    // Objects
  ],
};

export default head;
