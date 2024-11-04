<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="loginSubmit">
    <a-form-item field="username" label="账号">
      <a-input v-model="form.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item field="userPassword" label="密码">
      <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item>
      <a-button
        class="bt"
        type="primary"
        size="large"
        shape="round"
        html-type="submit"
        >登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import router from '@/router';
import store from '@/store';
import { TOKEN_KEY } from '@/utils/contant';
import message from '@arco-design/web-vue/es/message';
import { reactive } from 'vue';
import { Service, UserLoginReq } from '../../../openapi';

const form = reactive<UserLoginReq>({
  username: '',
  userPassword: '',
});

const loginSubmit = async () => {
  const res = await Service.login(form);
  console.log(res);
  if (res.code === 0) {
    message.info({
      content: '登录成功：',
    });
    //保存token
    localStorage.setItem(TOKEN_KEY, res.data ?? '');
    //获取当前用户
    await store.dispatch('user/getLoginUser');
    //页面跳转(不向页面栈中添加)
    router.replace({
      path: '/',
    });
  } else {
    message.error({
      content: '登录失败：' + JSON.stringify(res),
    });
  }
};
</script>
<style>
.bt {
  margin: 5% auto;
  height: 40px;
  width: 150px;
}
</style>
