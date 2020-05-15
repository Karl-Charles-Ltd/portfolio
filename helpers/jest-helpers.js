import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import VueRouter from 'vue-router';

export function setup() {
  const renderer = createRenderer();
  const localVue = createLocalVue();
  const router = new VueRouter();

  // setupPlugins(useVuex, localVue);

  return {
    renderer,
    router,
    localVue,
    shallowMount,
  };
}

export function componentFactory(component, options) {
  return shallowMount(component, options);
}

export function createSnapshot(component, options) {
  const wrapper = componentFactory(component, options);
  expect(wrapper.exists()).toBeTruthy();
  expect(wrapper.html()).toMatchSnapshot();
}
