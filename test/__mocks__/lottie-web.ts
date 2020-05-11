'use strict';

import { AnimationConfig } from 'lottie-web';

// @ts-ignore-start
const lottie: any = jest.genMockFromModule('lottie-web');

export const getAnimation = (config: AnimationConfig) => ({
  currentFrame: 0,
  firstFrame: 0,
  totalFrames: 100,
  frameRate: 30,
  playSpeed: 1,
  playDirection: 1,
  playCount: 0,
  animationData: {},
  assets: [],
  isPaused: !config.autoplay || false,
  autoplay: config.autoplay || true,
  loop: config.loop || true,
  renderer: config.renderer || 'svg',
  timeCompleted: 0,
  segmentPos: 0,
  segments: [],
  setParams: jest.fn(),
  setData: jest.fn(),
  includeLayers: jest.fn(),
  loadNextSegment: jest.fn(),
  loadSegments: jest.fn(),
  imagesLoaded: jest.fn(),
  preloadImages: jest.fn(),
  configAnimation: jest.fn(),
  waitForFontsLoaded: jest.fn(),
  checkLoaded: jest.fn(),
  resize: jest.fn(),
  setSubframe: jest.fn(),
  gotoFrame: jest.fn(),
  renderFrame: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  togglePause: jest.fn(),
  stop: jest.fn(),
  goToAndStop: jest.fn(),
  goToAndPlay: jest.fn(),
  advanceTime: jest.fn(),
  adjustSegment: jest.fn(),
  setSegment: jest.fn(),
  playSegments: jest.fn(),
  resetSegments: jest.fn(),
  checkSegments: jest.fn(),
  destroy: jest.fn(),
  setCurrentRawFrameValue: jest.fn(),
  setSpeed: jest.fn(),
  setDirection: jest.fn(),
  updaFrameModifier: jest.fn(),
  getPath: jest.fn(),
  getAssetsPath: jest.fn(),
  getAssetData: jest.fn(),
  hide: jest.fn(),
  show: jest.fn(),
  getDuration: jest.fn(),
  trigger: jest.fn(),
  triggerRenderFrameError: jest.fn(),
  triggerConfigError: jest.fn(),
});

// @ts-ignore
lottie.loadAnimation = jest.fn((config: AnimationConfig) => {
  const { container, renderer } = config;
  if (renderer === 'svg') {
    container.innerHTML = '<svg class="animation">Animation</svg>';
  } else if (renderer === 'canvas') {
    container.innerHTML = '<canvas class="animation">Animation</canvas>';
  } else if (renderer === 'html') {
    container.innerHTML = '<div class="animation">Animation</div>';
  }

  return getAnimation(config);
});

// @ts-ignore-end

export default lottie;
