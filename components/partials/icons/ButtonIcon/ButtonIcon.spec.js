import ButtonIcon from './ButtonIcon.vue';
import { createSnapshot, testComputedProperty } from '~/helpers/jest-helpers';

describe('ButtonIcon', () => {
  test('renders a button with a base icon', () => {
    createSnapshot(ButtonIcon, { propsData: { icon: 'Tick', disc: false }, stubs: ['BaseIcon'] });
  });

  describe('computed', () => {
    describe('outerClasses property', () => {
      let tempVue;
      const expectedOuterClasses = {
        size: 'v-btn-icon--intermediate',
        focus: 'v-btn-icon--focus',
        disc: 'v-btn-icon--disc',
        disabled: 'v-btn-icon--disabled',
        theme: 'v-btn-icon--quinary',
      };
      beforeEach(() => {
        tempVue = {
          size: 'intermediate',
          theme: 'quinary',
          focus: true,
          disabled: true,
          disc: true,
        };
      });
      it('returns correct icon size', () => {
        const outerClasses = testComputedProperty(ButtonIcon, 'outerClasses', tempVue);
        expect(outerClasses[expectedOuterClasses.size]).toBeTruthy();
      });
      it('returns correct icon theme', () => {
        const outerClasses = testComputedProperty(ButtonIcon, 'outerClasses', tempVue);
        expect(outerClasses[expectedOuterClasses.theme]).toBeTruthy();
      });
      it('returns focus class', () => {
        const outerClasses = testComputedProperty(ButtonIcon, 'outerClasses', tempVue);
        expect(outerClasses[expectedOuterClasses.focus]).toBeTruthy();
      });
      it('returns disabled class', () => {
        const outerClasses = testComputedProperty(ButtonIcon, 'outerClasses', tempVue);
        expect(outerClasses[expectedOuterClasses.disabled]).toBeTruthy();
      });
      it('returns disc class', () => {
        const outerClasses = testComputedProperty(ButtonIcon, 'outerClasses', tempVue);
        expect(outerClasses[expectedOuterClasses.disc]).toBeTruthy();
      });
    });
    describe('graphic property', () => {
      let tempVue;
      beforeEach(() => {
        tempVue = {
          icon: 'Test',
          loading: true,
          disc: true,
        };
      });
      it('returns loading spinner if loading and disc are true icon', () => {
        const graphic = testComputedProperty(ButtonIcon, 'graphic', tempVue);
        expect(graphic).toEqual('LoadingSpinner');
      });
      it('returns icon if loading or disc are false', () => {
        tempVue.loading = false;
        const graphic = testComputedProperty(ButtonIcon, 'graphic', tempVue);
        expect(graphic).toEqual('Test');
      });
    });
  });
});
