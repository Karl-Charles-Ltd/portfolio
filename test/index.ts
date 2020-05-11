import { config } from '@vue/test-utils';
import 'jest-canvas-mock';

// Create fromEntries as it doesn't exist in Jest
Object.fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

// Add a global mock for IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  callback?: (entries: any, observer: any) => {};

  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    if (this.callback) {
      this.callback([], this);
    }

    return null;
  }

  unobserve() {
    this.callback = undefined;
    return null;
  }
};

if (!config.stubs) config.stubs = {};

// Stub Nuxt components
config.stubs['nuxt-link'] = { template: '<a href="#"><slot /></a>' };
config.stubs['router-link'] = { template: '<a href="#"><slot /></a>' };
config.stubs['client-only'] = { template: '<span><slot /></span>' };
config.stubs.transition = { template: '<div><slot /></div>' };

// Stub VeeValidate components
config.stubs.Validate = { template: '<div><slot slot-scope="{ errors: [] }" /></div>' };
config.stubs.ValidationObserver = { template: '<div><slot slot-scope="{ errors: [] }" /></div>' };
