<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import GlobalScenes from './globalScenes';
import 'reflect-metadata';

interface RollyScene {
  trigger?: String;
  speed?: Number;
  transform?: Function;
  change?: Function;
  appear?: Function;
}

const NavigationStore = namespace('navigation');

@Component
export default class RollyMixin extends Vue {
  public Rolly: Function | undefined;
  public rollyScenes: RollyScene;

  private isBrowserIE: Boolean;
  private isDevice: Boolean;

  constructor() {
    super();
    this.rollyScenes = {};
    this.isBrowserIE = false;
    this.isDevice = false;
  }

  @NavigationStore.Action('setScrolledStatus') setScrolledStatus;

  /** this can be added to any DOM element to easily add device specific identifiers */
  get globalClasses(): object {
    return {
      'browser-ie': this.isBrowserIE,
      'device-only': this.isDevice,
    };
  }

  public isIE(): Boolean | unknown | undefined {
    if (!window) return;
    // @ts-ignore
    return window.document.documentMode;
  }

  private mounted(): void {
    this.initScrolling();
  }

  private destroyed(): void {
    if (!window) return;
    removeEventListener('scroll', this.primitiveScrollListener);
  }

  private primitiveScrollListener() {
    if (!window) return;
    if (window.scrollY >= 50) {
      this.setScrolledStatus(true);
    } else {
      this.setScrolledStatus(false);
    }
  }

  private initScrolling() {
    const Rolly = require('rolly.js');
    const view = document.querySelector('#main');

    // If it's not a touch device && not Internet Explorer
    if (!matchMedia('(pointer: coarse)').matches && !this.isIE()) {
      const rollyInstance = Rolly({
        view,
        native: true,
        change: ({ changing, current }) => {
          if (changing) {
            if (current >= 50) {
              this.setScrolledStatus(true);
            } else {
              this.setScrolledStatus(false);
            }
          }
        },
        virtualScroll: {
          limitInertia: false,
          mouseMultiplier: 0.5,
          touchMultiplier: 1.5,
          firefoxMultiplier: 40,
          preventTouch: false,
        },
        scenes: {
          ...GlobalScenes,
          ...this.rollyScenes,
        },
      });

      // Iyt so.. Boom
      rollyInstance.init();

      this.Rolly = rollyInstance;
    } else if (!matchMedia('(pointer: coarse)').matches && this.isIE()) {
      // If it's not a touch device & it is IE
      this.isBrowserIE = true;
      this.isDevice = true;

      // Add event listener for header scrolled styles
      window.addEventListener('scroll', this.primitiveScrollListener, { passive: true });
    } else {
      // Disable all Rolly data attr site-wide
      this.isDevice = true;
    }
  }
}
</script>
