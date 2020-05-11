/**
 * Augment the typings of Vue.js
 */

import Vue, { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import * as SentryTypes from '@sentry/minimal';

interface Auth<T = any> {
  ctx: any;
  $state: any; // todo: type this
  $storage: Storage;
  user: Partial<T>;
  loggedIn: boolean;
  loginWith(strategyName: string, ...args: any): Promise<never>;
  login(...args: any): Promise<never>;
  logout(): Promise<never>;
  fetchUser(): Promise<never>;
  fetchUserOnce(): Promise<never>;
  hasScope(scopeName: string): boolean;
  setToken(strategyName: string, token?: string): string;
  syncToken(strategyName: string): string;
  onError(handler: (error: Error, name: string, endpoint: any) => void): any;
  setUser(user?: Partial<T>): any;
  reset(): Promise<never>;
  redirect(name: string): any;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
    options?: Record<string, any>;
    middleware?: string | string[];
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth<any>;
    $axios: NuxtAxiosInstance;
    $router: VueRouter;
    $sentry: SentryTypes;
  }
}

declare module 'vue/types/vue' {
  interface Vue extends GlobalInjects {}
}

declare module '@nuxt/types' {
  interface Context extends GlobalInjects {}
  interface NuxtAppOptions extends GlobalInjects {}
}

declare module 'vuex/types' {
  interface Store<S> extends GlobalInjects {}
}

declare module 'vuex-module-decorators/dist/types/vuexmodule' {
  interface VuexModule extends VXModule, GlobalInjects {}
}
