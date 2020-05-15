import BaseLayoutItem from './BaseLayoutItem.vue';
import { setup, componentFactory, createSnapshot } from '~/helpers/jest-helpers';

const { localVue } = setup();

const shallowMountComponent = (options) => componentFactory(BaseLayoutItem, { localVue, ...options });

describe('BaseLayoutItem', () => {
  test('mounts and renders properly', () => {
    createSnapshot(BaseLayoutItem);
  });

  it(`has the width utility class if a ratio (r) prop is set`, () => {
    const ratio = '1/2';
    const wrapper = shallowMountComponent({ propsData: { r: ratio } });
    expect(wrapper.classes().includes(`u-${ratio}`)).toBeTruthy();
  });

  it(`has a default 100% width utility class if the ratio (r) prop is not set`, () => {
    const wrapper = shallowMountComponent();
    expect(wrapper.classes().includes('u-1/1')).toBeTruthy();
  });
});
