import { accessEnum } from '@/access/accessEnum';
import { checkAccess } from '@/access/checkAccess';
import router from '@/router';
import store from '@/store';

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
    if (!checkAccess(loginUser, access as number)) {
      next('/noAuth');
      return;
    }
  }

  next();
});
