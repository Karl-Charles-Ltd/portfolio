import { VNodeDirective } from 'vue/types/vnode';

type ObserveHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  isIntersecting: boolean
) => void;

export interface ObserveVNodeDirective extends Omit<VNodeDirective, 'modifiers'> {
  value?: ObserveHandler | { handler: ObserveHandler; options?: IntersectionObserverInit };
  modifiers?: {
    once?: boolean;
    quiet?: boolean;
  };
}

export interface ObservedHTMLElement extends HTMLElement {
  _observe?: {
    init: boolean;
    observer: IntersectionObserver;
  };
}

function inserted(el: ObservedHTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const { handler, options } = typeof value === 'object' ? value : { handler: value, options: {} };

  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[] = [], observer: IntersectionObserver) => {
      if (!el._observe) return; // Shouldn't be called, but just in case somehow we get here and this element hasn't be designated for observation, then return

      if (handler && (!modifiers.quiet || el._observe.init)) {
        const isIntersecting = Boolean(entries.find((entry) => entry.isIntersecting));

        handler(entries, observer, isIntersecting);
      }

      // To support the 'once' modifier so the callback is only called once.
      if (el._observe.init && modifiers.once) {
        unbind(el);
      } else {
        el._observe.init = true;
      }
    },
    options
  );

  el._observe = { init: false, observer };

  observer.observe(el);
}

function unbind(el: ObservedHTMLElement) {
  if (!el._observe) return;

  el._observe.observer.unobserve(el);
  delete el._observe;
}

export const Intersect = {
  inserted,
  unbind,
};

export default Intersect;
