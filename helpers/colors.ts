/**
 * Get the hex color codes that are used throughout the project.
 * These colors and names should match with
 * assets/scss/settings/_settings.colors.scss.
 *
 * @param {String} colorName - The color name from the theme
 * @returns {String} - The hex code for the matching color
 */
export function colorFromTheme(colorName) {
  const colors = {
    primary: '#6b2f93',
    secondary: '#D0438F',
    tertiary: '#09ECFD',
    quaternary: '#f40ee3',
    quinary: '#370b3c',
    black: '#000000',
    charcoal: '#4D4D4D',
    'grey-one': '#949494',
    'grey-two': '#CDCDCD',
    'light-grey': '#E2E2E2',
    'light-grey-one': '#E2E2E2',
    'light-grey-two': '#F9F9F9',
    white: '#FFFFFF',
  };

  return colors[colorName];
}

export const themeMap = {
  primary: {
    background: 'primary',
    foreground: 'secondary',
  },
  'primary-dark': {
    background: 'primary-dark',
    foreground: 'secondary',
  },
  secondary: {
    background: 'secondary',
    foreground: 'white',
    accent: 'tertiary',
  },
  'secondary-dark': {
    background: 'secondary-dark',
    foreground: 'white',
  },
  'secondary-light': {
    background: 'secondary-light',
    foreground: 'white',
  },
  tertiary: {
    background: 'tertiary',
    foreground: 'secondary',
  },
  quaternary: {
    background: 'quaternary',
    foreground: 'secondary',
  },
  quinary: {
    background: 'quinary',
    foreground: 'white',
  },
  'quinary-darker': {
    background: 'quinary-darker',
    foreground: 'white',
  },
  white: {
    background: 'white',
    foreground: 'secondary',
  },
  charcoal: {
    background: 'charcoal',
    foreground: 'white',
  },
  'light-grey-one': {
    background: 'light-grey-one',
    foreground: 'secondary',
  },
};
