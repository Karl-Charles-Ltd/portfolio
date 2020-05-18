import BaseToggleButton from './BaseToggleButton.vue';
import { setup, createSnapshot, componentFactory } from '~/helpers/jest-helpers';

const { localVue } = setup();
const shallowMountComponent = (options) => componentFactory(BaseToggleButton, { localVue, ...options });

describe('BaseToggleButton', () => {
  let propsData;
  let slots;
  beforeEach(() => {
    propsData = {
      id: 'test',
    };
  });
  it('is a Vue instance', () => {
    createSnapshot(BaseToggleButton, { localVue, propsData, slots });
  });
  describe('methods', () => {
    describe('toggle', () => {
      it('sets the "on" boolean true', () => {
        const wrapper = shallowMountComponent({ propsData });
        wrapper.vm.toggle();
        expect(wrapper.vm.on).toBeTruthy();
      });
      it('emits "on" data property', () => {
        const wrapper = shallowMountComponent({ propsData });
        wrapper.vm.toggle();
        expect(wrapper.emitted('toggled')[0][0]).toBeTruthy();
      });
    });
  });
});
