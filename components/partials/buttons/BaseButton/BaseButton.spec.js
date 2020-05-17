import BaseButton from './BaseButton.vue';
import { setup, componentFactory, createSnapshot } from '~/helpers/jest-helpers';

const { localVue } = setup();

const shallowMountComponent = (options) => componentFactory(BaseButton, { localVue, ...options });

describe('BaseButton', () => {
  const stubs = ['BaseIcon'];
  test('mounts and renders properly', () => {
    createSnapshot(BaseButton, { localVue, stubs });
  });

  const buttonTypes = ['block', 'outline', 'line', 'action'];
  for (let test = 0; test < buttonTypes.length; test += 1) {
    const buttonType = buttonTypes[test];

    it(`has the ${buttonType} class if the type is ${buttonType}`, () => {
      const wrapper = shallowMountComponent({ propsData: { type: buttonType }, stubs });
      expect(wrapper.classes().includes(`v-btn--${buttonType}`)).toBeTruthy();
    });
  }

  const buttonStates = ['disabled', 'active', 'loading'];
  for (let test = 0; test < buttonStates.length; test += 1) {
    const buttonState = buttonStates[test];

    it(`has the ${buttonState} class if the state is ${buttonState}`, () => {
      const wrapper = shallowMountComponent({ propsData: { [buttonState]: true }, stubs });
      expect(wrapper.classes().includes(`v-btn--${buttonState}`)).toBeTruthy();
    });
  }
});
