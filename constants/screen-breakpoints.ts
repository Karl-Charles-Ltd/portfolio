const MOBILE = 'mobile';
const TABLET = 'tablet';
const SMALL_DESK = 'smallDesk';
const LARGE_DESK = 'largeDesk';
const HUGE_DESK = 'hugeDesk';

const BREAKPOINT_MAP = {
  mobile: { name: 'mobile', pixels: 0 },
  tablet: { name: 'tablet', pixels: 672 },
  smallDesk: { name: 'smallDesk', pixels: 1056 },
  largeDesk: { name: 'largeDesk', pixels: 1312 },
  hugeDesk: { name: 'hugeDesk', pixels: 1584 },
};

export { MOBILE, TABLET, SMALL_DESK, LARGE_DESK, HUGE_DESK, BREAKPOINT_MAP };
