import user from '@/store/user';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  mutations: {},
  actions: {},
  modules: { user },
  plugins: [
    createPersistedState({
      storage: window.localStorage, // 或者使用 sessionStorage
    }),
  ],
});
