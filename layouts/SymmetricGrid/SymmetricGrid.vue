<template>
  <div id="grid">
    <transition name="fade">
      <template v-if="ready">
        <div id="grid--wrapper">
          <div class="rows">
            <div v-for="index in parseInt(rows)" :key="index" class="row" :style="style(index, true)"></div>
          </div>
          <div class="cols">
            <div
              v-for="index in parseInt(columns)"
              :key="index"
              class="col"
              :style="style(index, false)"
            ></div>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { colorFromTheme } from '~/helpers/colors';

const availableColors: string[] = ['quinary', 'quinary-light'];

@Component
export default class SymmetricGrid extends Vue {
  @Prop({ default: 100 }) readonly spacing!: number;
  @Prop({ default: true }) readonly vertical!: boolean;
  @Prop({ default: true }) readonly horizontal!: boolean;
  @Prop({ default: 'quinary-light', validator: (value) => availableColors.includes(value) })
  readonly theme!: string;

  private ready: boolean = false;
  private columns: number = 0;
  private rows: number = 0;
  private width: number = 0;
  private height: number = 0;

  // protected get screenWidth(): number {
  //   return screen.width;
  // }
  //
  // protected get screenHeight(): number {
  //   return screen.height;
  // }

  /**
   * @param { number } num
   */
  protected calculateElements(num: number): number {
    return num / this.spacing;
  }

  protected mapValues(): void {
    this.width = screen.width;
    this.height = window.outerHeight;
    this.columns = this.calculateElements(this.width);
    this.rows = this.calculateElements(this.height);
  }

  /**
   * @param { number } iteration
   * @param { boolean } horizontal
   */
  protected style(iteration: number, horizontal: boolean): any {
    // eslint-disable-next-line

    return {
      left: !horizontal ? `calc(${iteration * this.spacing}px)` : '0',
      top: horizontal ? `calc(${iteration * this.spacing}px)` : '0',
      backgroundColor: `${colorFromTheme(this.theme)}`,
    };
  }

  async mounted() {
    await this.mapValues();
    this.ready = true;
  }
}
</script>

<style lang="scss">
#grid {
  @extend %absolute;
  opacity: 0.6;
  overflow: hidden;

  .rows {
    .row {
      height: 1px;
      left: 0;
      position: absolute;
      right: 0;
      width: 100%;

      &:after {
        background-color: lighten(color('quinary-light'), 16);
        content: '';
        height: 1px;
        left: 0;
        position: absolute;
        right: 0;
        top: 1px;
      }
    }
  }

  .cols {
    .col {
      bottom: 0;
      height: 1000%;
      position: absolute;
      top: 0;
      width: 1px;
    }
  }
}
</style>
