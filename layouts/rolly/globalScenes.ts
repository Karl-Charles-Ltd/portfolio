interface RollyScene {
  trigger?: String;
  speed?: Number;
  transform?: Function;
  change?: Function;
  appear?: Function;
}

const scrollYGlobal: RollyScene = {
  transform({ globalState, sceneState, transform }) {
    const { transformPrefix } = globalState;
    const { context } = sceneState.cache;

    context.style[transformPrefix] = `translate3d(0, ${transform}px, 0)`;
  },
};

const scaleY: RollyScene = {
  transform({ globalState, sceneState, transform }) {
    const { previous, current, transformPrefix } = globalState;
    const { context } = sceneState.cache;
    const delta = current - previous;

    context.style[transformPrefix] = `translate3d(0, ${transform}px, 0)`;
    context.style.transformOrigin = `50% ${50 - delta * 2}%`;
  },
};

const scrollYOpacity: RollyScene = {
  trigger: 'start',
  transform({ globalState, sceneState, transform }) {
    const { previous, current, transformPrefix } = globalState;
    const { context } = sceneState.cache;
    const delta = current - previous;
    const opacity = sceneState.progressInView * 2.75;
    const rotationZ = delta / 20;
    const skew = delta / 20;

    context.style[
      transformPrefix
    ] = `translate3d(0, ${transform}px, 0) rotateZ(${rotationZ}deg) skew(${skew}deg)`;
    context.style.opacity = opacity;
  },
};

const expand: RollyScene = {
  trigger: 'bottom',
  transform({ sceneState }) {
    const { context } = sceneState.cache;
    const scale = 0.5 + sceneState.progressInView;

    context.style.transform = `scale(${scale})`;
  },
};

const shrink: RollyScene = {
  speed: 0.5,
  transform({ sceneState }) {
    const { context } = sceneState.cache;
    const scale = 1.25 - sceneState.progressInView;

    context.style.transform = `scale(${scale})`;
  },
};

const blurGlobal: RollyScene = {
  trigger: 'end',
  change({ sceneState }) {
    const parentEl = sceneState.cache.context.parentElement;

    if (sceneState.progressInView > 0.5) {
      parentEl.classList.add('revert');
    } else if (sceneState.progressInView <= 0.5 && parentEl.classList.contains('revert')) {
      parentEl.classList.remove('revert');
    }
  },
};

const opacity: RollyScene = {
  trigger: 'start',
  appear({
    sceneState: {
      cache: { context },
    },
  }) {
    if (!context.classList.contains('reveal')) context.classList.add('reveal');
  },
  transform({ globalState, sceneState, transform }) {
    const { transformPrefix } = globalState;
    const { context } = sceneState.cache;
    context.style[transformPrefix] = `translate3d(0, ${transform}px, 0)`;
  },
};

export default {
  scrollYGlobal,
  opacity,
  scaleY,
  scrollYOpacity,
  expand,
  shrink,
  blurGlobal,
};
