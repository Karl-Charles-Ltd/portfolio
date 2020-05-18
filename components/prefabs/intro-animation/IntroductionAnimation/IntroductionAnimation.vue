<template>
  <BaseLayout class="dl-introduction">
    <BaseLayoutItem r="1/1">
      <div class="dl-introduction__underlay">
        <!-- insert element -->
      </div>
      <div class="dl-introduction__shape">
        <div class="dl-introduction__shape--message --message">
          <span class="outline">Y</span>
          <span class="outline">O.</span>
        </div>
        <div class="dl-introduction__shape--line --line-wrapper">
          <div class="dl-introduction__shape--line __disengaged">
            <div class="line"></div>
          </div>
          <div class="dl-introduction__shape--line __engaged">
            <div class="line"></div>
          </div>

          <div id="logo">
            <Logo class="logo--small" />
            <Logo class="logo--medium" theme="quinary" />
            <Logo class="logo--large" theme="quinary" />
          </div>
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

    setTimeout(() => this.loadingAnimation(), 1000);
  }

  loadingAnimation() {
    const disengaged = '.__disengaged .line';
    const engaged = '.__engaged .line';
    const message = '.--message';
    const logo = '.logo';
    const logoSmall = '.logo--small';
    const logoMedium = '.logo--medium';
    const logoLarge = '.logo--large';

    // Stage 1
    this.timeLine
      .to(engaged, 1, { height: '33%' })
      .to(engaged, 1, { height: '66%' }, '+=0.25')
      .to(engaged, 1, { height: '100%' }, '-=0.85')
      .to(engaged, 0.5, { opacity: 1, filter: 'brightness(2)' })
      .to(disengaged, 0, { backgroundColor: '#370b3c', boxShadow: '0 0 10px #370b3c', opacity: 0.6 })
      .to(logoSmall, 1, { opacity: 1 })
      .to(message, 0, { filter: 'brightness(1)' }, '+=0.1')
      .to(message, 0, { opacity: 0.3 }, '+=0.1')
      .to(message, 0, { opacity: 0.1 }, '+=0.1')
      .to(message, 0, { opacity: 0.5 }, '+=0.1')
      .to(message, 0, { opacity: 0.2 }, '+=0.1')
      .to(message, 0, { opacity: 1 }, '+=0.1')
      .to(logoMedium, 1, { opacity: 1 }, '-=0.75')
      .to(logoLarge, 1, { opacity: 1 }, '-=0.5')
      .to(logoSmall, 1, { filter: 'brightness(2) drop-shadow(0 0 10px #6b2f93)' }, '-=1.5')
      .to(logo, 1, { transform: 'scale(1)', ease: 'power3.out' }, '-=1.575')
      .to([logo, message], 0.75, { opacity: 0 }, '+=1.75');

    // Stage 2
    this.timeLine
      .to(engaged, 1, { marginBottom: '100%' })
      .to(disengaged, 0.5, { marginBottom: '100%' }, '-=0.75')
      .to('.dl-introduction', 1, { bottom: '100%', ease: 'power3.out' }, '-=0.5');
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
      @extend %flex--center;
      filter: brightness(0.5) grayscale(1);
      max-width: 80%;
      opacity: 0.1;
      width: 100%;

      > div {
        flex: 1;
        text-align: center;
      }

      span {
        @include neon('secondary');
        color: color('secondary');
        display: block;
        font-family: font('secondary');
        font-size: 4rem;
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;

        &.outline {
          @include outlineText('secondary', 'secondary');
          font-size: calc(80vw / 7);
          text-align: center;
          width: 100%;
        }
      }
    }

    &--line {
      @extend %absolute;
      @extend %flex--center !optional;

      .line {
        height: 100%;
        width: 2px;
      }

      #logo {
        @extend %flex--center;
        height: 200px;
        width: 200px;

        .logo {
          clip: rect(0, 900px, 0, 0);
          filter: brightness(1) drop-shadow(0 0 10px color('secondary'));
          opacity: 0;
          position: absolute;
          transform: scale(1.25);

          &--small {
            position: relative;
          }

          &--medium {
            animation: noise-anim-alt 2s infinite linear alternate-reverse;
            filter: brightness(0.75);
            height: 125px;
            width: 125px;
          }

          &--large {
            animation: noise-anim 2s infinite linear alternate-reverse;
            filter: brightness(0.75);
            height: 150px;
            width: 150px;
          }
        }
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
