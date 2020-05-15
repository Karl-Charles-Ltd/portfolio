import BaseLayout from './BaseLayout.vue';
import { setup, componentFactory, createSnapshot } from '~/helpers/jest-helpers';

const { localVue } = setup();

const shallowMountComponent = (options) => componentFactory(BaseLayout, { localVue, ...options });

describe('BaseLayout', () => {
  test('mounts and renders properly', () => {
    createSnapshot(BaseLayout);
  });

  it(`has the auto width class if the autoWidth prop is true`, () => {
    const wrapper = shallowMountComponent({ propsData: { autoWidth: true } });
    expect(wrapper.classes().includes(`v-layout--auto`)).toBeTruthy();
  });

  it(`has the reverse order class if the revers prop is true`, () => {
    const wrapper = shallowMountComponent({ propsData: { reverse: true } });
    expect(wrapper.classes().includes(`v-layout--reverse`)).toBeTruthy();
  });

  const gutters = ['default-pattern', 'none', 'base', 'small', 'medium', 'intermediate', 'large'];
  for (let sizeTest = 0; sizeTest < gutters.length; sizeTest += 1) {
    const gutter = gutters[sizeTest];
    it(`has the ${gutter} gutter class if the size type is ${gutter}`, () => {
      const wrapper = shallowMountComponent({ propsData: { gutter } });
      expect(wrapper.classes().includes(`v-layout--${gutter}`)).toBeTruthy();
    });
  }

  const alignModes = ['top', 'middle', 'bottom', 'baseline', 'stretch'];
  for (let alignModeTest = 0; alignModeTest < alignModes.length; alignModeTest += 1) {
    const alignMode = alignModes[alignModeTest];
    it(`has the ${alignMode} align mode class if the align mode type is ${alignMode}`, () => {
      const wrapper = shallowMountComponent({ propsData: { align: alignMode } });
      expect(wrapper.classes().includes(`v-layout--${alignMode}`)).toBeTruthy();
    });
  }

  const directions = ['row', 'column'];
  for (let directionTest = 0; directionTest < directions.length; directionTest += 1) {
    const direction = directions[directionTest];
    it(`has the ${direction} direction class if the direction type is ${direction}`, () => {
      const wrapper = shallowMountComponent({ propsData: { direction } });
      expect(wrapper.classes().includes(`v-layout--${direction}`)).toBeTruthy();
    });
  }

  const fillDirections = ['left', 'right', 'center', 'around', 'between', 'evenly'];
  for (let fillDirectionsTest = 0; fillDirectionsTest < fillDirections.length; fillDirectionsTest += 1) {
    const fillDirection = fillDirections[fillDirectionsTest];
    it(`has the fill direction ${fillDirection} class if the fill direction type is ${fillDirection}`, () => {
      const wrapper = shallowMountComponent({ propsData: { fillDirection } });
      expect(wrapper.classes().includes(`v-layout--${fillDirection}`)).toBeTruthy();
    });
  }
});
