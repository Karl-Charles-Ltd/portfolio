import BaseIcon from './BaseIcon.vue';
import { setup, componentFactory, createSnapshot, testComputedProperty } from '~/helpers/jest-helpers';

const { localVue } = setup();

const shallowMountComponent = (options) => componentFactory(BaseIcon, { localVue, ...options });

describe('BaseIcon', () => {
  test('is a Vue instance', () => {
    createSnapshot(BaseIcon, { propsData: { icon: 'Bin' } });
  });

  describe('computed', () => {
    describe('iconClasses property', () => {
      let tempVue;
      const expectedIconClasses = {
        direction: 'v-icon--down',
        size: 'v-icon--intermediate',
        theme: 'u-color-quinary',
      };
      beforeEach(() => {
        tempVue = {
          direction: 'down',
          icon: 'ArrowCenter',
          size: 'intermediate',
          theme: 'quinary',
        };
      });
      it('returns the correct direction class if icon is ArrowCenter', () => {
        const iconClasses = testComputedProperty(BaseIcon, 'iconClasses', tempVue);
        expect(iconClasses[expectedIconClasses.direction]).toBeTruthy();
      });
      it('returns correct icon size', () => {
        const iconClasses = testComputedProperty(BaseIcon, 'iconClasses', tempVue);
        expect(iconClasses[expectedIconClasses.size]).toBeTruthy();
      });
      it('returns correct icon theme', () => {
        const iconClasses = testComputedProperty(BaseIcon, 'iconClasses', tempVue);
        expect(iconClasses[expectedIconClasses.theme]).toBeTruthy();
      });
    });
  });

  test('throws an error if the icon does not exist', () => {
    /* eslint-disable no-console */
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      shallowMountComponent({ propsData: { icon: 'Test' } });
    }).toThrowError('Test does not exist.');

    console.error = originalError;
    /* eslint-enable no-console */
  });
});
