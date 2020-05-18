import { themeMap } from './colors';

export function validateTheme(theme: string, extraColors: string[] = []): boolean {
  const baseThemes: string[] = Object.keys(themeMap);
  const availableThemes: string[] = baseThemes.concat(extraColors);

  return availableThemes.includes(theme);
}
