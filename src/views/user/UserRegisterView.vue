<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="registerSubmit">
    <a-form-item field="username" label="账号">
      <a-input v-model="form.username" placeholder="请输入您的用户名" />
    </a-form-item>
    <a-form-item field="userPassword" label="密码">
      <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item field="checkPassword" label="确认密码">
      <a-input-password
        v-model="form.checkPassword"
        placeholder="请再输入密码"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        class="bt"
        type="primary"
        size="large"
        shape="round"
        html-type="submit"
        >注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import router from '@/router';
import message from '@arco-design/web-vue/es/message';
import { reactive } from 'vue';
import { Service, UserRegisterReq } from '../../../openapi';

const form = reactive<UserRegisterReq>({
  username: '',
  userPassword: '',
  checkPassword: '',
});

const registerSubmit = async () => {
  const res = await Service.register(form);
  console.log(res);
  if (res.code === 0) {
    message.info({
      content: '注册成功！：',
    });
    router.replace({
      path: '/user',
    });
  } else {
    message.error({
      content: '注册失败！：' + res.message,
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
