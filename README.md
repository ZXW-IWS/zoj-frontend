# OJ项目前端源码

## (一) 前端初始化

### 1. vue脚手架初始化

通过vue-cli进行前端项目的初始化工作

### 2. prettier代码美化开启

![img](https://cdn.nlark.com/yuque/0/2024/png/43296583/1728722230734-8bb3e6bd-4868-4261-b6f4-6641ec9ebc25.png)

### 3. 引入arco design组件库

https://arco.design/vue/docs/start



## (二) 全局状态管理

用于进行用户访问页面时做一些校验,存储用户的状态信息

vuex:https://vuex.vuejs.org/zh/guide/structure.html

```typescript
// initial state
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
const actions = {};

// mutations
const mutations = {
  updateUser(state: any, payload: any) {
    state.loginUser = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
```

### 1. 引入vuex-persistedstate插件

由于原生的vuex会有刷新后数据丢失的问题，因此需要引入vuex-persistedstate插件来将其状态持久化存储。

```bash
npm install vuex-persistedstate --legacy-peer-deps
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
```

## (三) 全局权限管理

为了控制页面是否允许用户访问（一些页面可能只允许管理员访问）。

### 1. 根据权限隐藏导航栏菜单



## (四) 前后端联调

可以使用openapi自动生成axio请求后端代码

```bash
openapi --input http://localhost:9191/api/v3/api-docs --output ./openapi --client axios
```

之后再通过axios的拦截器功能实现多环境下请求路径的配置

## (五) 路由守卫功能

```typescript
router.beforeEach(async (to, from, next) => {
  console.log('登录用户信息：', store.state.user?.loginUser);
  let loginUser = store.state.user?.loginUser;
  //若没有用户信息且页面需要用户登录才可以访问，则尝试获取用户信息（通过token获取）
  const access = to.meta.access ?? accessEnum.NO_LOGIN;
  if (loginUser?.userRole === undefined && access !== accessEnum.NO_LOGIN) {
    await store.dispatch('user/getLoginUser');
    loginUser = store.state.user?.loginUser;
  }
  //若仍没有用户信息，则判断用户未登录，此时根据当前页面是否必须要用户登录才可访问跳转到用户登录页面
  if (access !== accessEnum.NO_LOGIN) {
    //用户未登录，跳转到登录页面
    if (loginUser?.userRole === undefined) {
      next(`/user/login/redirect=${to.fullPath}`);
      return;
    }
    //用户已登录，但权限不足以访问页面
    if (!checkAccess(loginUser, access as string)) {
      next('/noAuth');
      return;
    }
  }

  next();
});
```

## (六) 整合MarkDown文档编辑器

使用bytemd进行md文档的编辑

https://github.com/pd4d10/bytemd

## (七) 整合代码编辑器

微软官方代码编辑器：https://github.com/microsoft/monaco-editor

引入教程博客：https://blog.csdn.net/weixin_43977534/article/details/123822431

