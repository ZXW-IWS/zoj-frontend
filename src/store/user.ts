// initial state
import { ActionContext, StoreOptions } from 'vuex';
import { Service } from '../../openapi';

const state = () => ({
  loginUser: {
    userName: '未登录',
    avatar:
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
  },
});

// getters
const getters = {};

// actions
const actions = {
  async getLoginUser({ commit, state }: ActionContext<any, any>, payload: any) {
    const res = await Service.getCurrentUser();
    if (res.code === 0) {
      commit('updateUser', res.data);
    } else {
      commit('updateUser', payload);
    }
  },
};

// mutations
const mutations = {
  updateUser(state: any, payload: any) {
    console.log('update', payload);
    state.loginUser = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
} as StoreOptions<any>;
