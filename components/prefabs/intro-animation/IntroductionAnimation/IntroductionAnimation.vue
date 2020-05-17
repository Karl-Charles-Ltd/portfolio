<template>
  <BaseLayout class="dl-introduction">
    <BaseLayoutItem r="1/1">
      <div class="dl-introduction__underlay">
        <!-- insert element -->
      </div>
      <div class="dl-introduction__shape">
        <div class="dl-introduction__shape--message --message">
          <span>WELCOME</span>
        </div>

        <div class="dl-introduction__shape--line --line-wrapper">
          <div class="dl-introduction__shape--line __disengaged">
            <div class="line"></div>
          </div>
          <div class="dl-introduction__shape--line __engaged">
            <div class="line"></div>
          </div>

          <Logo />
        </div>
      </div>
    </BaseLayoutItem>
  </BaseLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { TimelineLite } from 'gsap';

const StaticVideo = () => import('~/components/containers/video/videos/StaticVideo.vue');
const Logo = () => import('~/components/prefabs/Logo/Logo.vue');

@Component({
  components: {
    StaticVideo,
    Logo,
  },
})
export default class IntroductionAnimation extends Vue {
  private isLoading: Boolean;
  private isInitialLoad: Boolean;
  private timeLine: any;

  constructor(props) {
    super(props);
    this.isLoading = false;
    this.isInitialLoad = true;
    this.timeLine = new TimelineLite({
      // eslint-disable-next-line
      onComplete: () => console.log('test'),
      force3d: true,
    });
  }

  static get environment() {
    return process.env.ENVIRONMENT;
  }

  mounted() {
    this.isInitialLoad = false;

    // setTimeout(() => this.setAnimation(), 750);
    setTimeout(() => this.loadingAnimation(), 1000);
  }

  loadingAnimation() {
    const disengaged = '.__disengaged .line';
    const engaged = '.__engaged .line';

    // Stage 1
    this.timeLine
      .to(engaged, 1, { height: '33%' })
      .to(engaged, 1, { height: '66%' }, '+=0.25')
      .to(engaged, 1, { height: '100%' }, '-=0.85')
      .to(engaged, 0.5, { opacity: 1, filter: 'brightness(2)' })
      .to(disengaged, 0, { backgroundColor: '#370b3c', boxShadow: '0 0 10px #370b3c', opacity: 0.6 })
      .to('.logo', 1, { opacity: 1 })
      .to('.logo', 1, { filter: 'brightness(2) drop-shadow(0 0 10px #6b2f93)' }, '-=0.5')
      .to('.logo', 1, { transform: 'scale(1)', ease: 'power3.out' }, '-=1.5')
      .to('.logo', 0.75, { opacity: 0 }, '+=0.25');

    // Stage 2
    // this.timeLine
    //   .to(engaged, 1, { marginBottom: '100%' })
    //   .to(disengaged, 0.5, { marginBottom: '100%' }, '-=0.75')
    //   .to('.dl-introduction', 1.25, { bottom: '100%', ease: 'power3.out' }, '-=0.5');
  }

  setAnimation() {
    if (!window) return;
    const staticEl: any = document.getElementById('static') || document.createElement('div');
    const context = staticEl.getContext('2d');
    const height = staticEl.clientHeight;
    const width = staticEl.clientWidth;
    const pixelWidth = 1;
    const pixelHeight = 2;

    const drawStatic = () => {
      for (let v = 1; v < height; v += pixelHeight) {
        for (let h = 2; h < width; h += pixelWidth) {
          const lum = Math.floor(Math.random() * 40);
          context.fillStyle = `hsl(0, 0%, ${lum}%)`;
          context.fillRect(h, v, pixelWidth, pixelHeight);
        }
      }
    };

    requestAnimationFrame(drawStatic);
  }
}
</script>

<style lang="scss">
.dl-introduction {
  @extend %flex;
  @extend %fixed;
  background-color: color('black');

  &__underlay {
    @extend %flex;
    @extend %absolute;

    &:after {
      @extend %absolute;
      background-color: color('black');
      content: '';
      opacity: 0.5;
    }

    canvas {
      height: 100%;
      width: 100%;
    }

    video {
      opacity: 0.25;
      transform: scale(4);
    }
  }

  &__shape {
    @extend %absolute;
    @extend %flex--center !optional;

    &--message {
      span {
        color: transparent;
        font-family: font('accent');
        font-size: 4rem;
        letter-spacing: 2px;
        -webkit-text-stroke-color: #fff;
        -webkit-text-stroke-width: 1px;
      }
    }

    &--line {
      @extend %absolute;
      @extend %flex--center !optional;

      .line {
        height: 100%;
        width: 2px;
      }

      .logo {
        animation: noise-anim 2s infinite linear alternate-reverse;
        clip: rect(0, 900px, 0, 0);
        filter: brightness(1) drop-shadow(0 0 10px color('secondary'));
        opacity: 0;
        transform: scale(1.25);
      }

      &.__disengaged {
        .line {
          background-color: rgba(color('charcoal'), 0.5);
        }
      }

      &.__engaged {
        @extend %flex--end--center;

        .line {
          background-color: color('secondary');
          box-shadow: 0 0 10px color('secondary');
          filter: brightness(1);
          height: 0;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
