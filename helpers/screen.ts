import * as screenBreakpoints from '~/constants/screen-breakpoints';

export const breakpoints: string[] = [
  screenBreakpoints.MOBILE,
  screenBreakpoints.TABLET,
  screenBreakpoints.SMALL_DESK,
  screenBreakpoints.LARGE_DESK,
  screenBreakpoints.HUGE_DESK,
];

interface Screen {
  [key: string]: string | null;
}

export default function mq({ from = null, until = null }: Screen, currentScreenSize: string): boolean {
  const currentBreakpointIndex = breakpoints.indexOf(currentScreenSize);

  if (from !== '' && from !== null) {
    const fromBreakpointIndex = breakpoints.indexOf(from || '');
    if (fromBreakpointIndex > currentBreakpointIndex) {
      return false;
    }
  }

  if (until !== '' && until !== null) {
    const untilBreakpointIndex = breakpoints.indexOf(until || '');
    if (untilBreakpointIndex <= currentBreakpointIndex) {
      return false;
    }
  }

  return true;
}
