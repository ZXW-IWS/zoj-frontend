<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="title-bar">
          <img class="logo" src="../assets/oj-logo.svg" alt="" />
          <div class="title">ZOJ</div>
        </div>
        <a-tabs
          class="content-tab"
          :active-key="activeKey"
          trigger="hover"
          :size="'large'"
          @change="navChange"
        >
          <a-tab-pane key="/user/login" title="登录" />
          <a-tab-pane key="/user/register" title="注册" />
        </a-tabs>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">{{ FOOTER_TEXT }}</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { FOOTER_TEXT } from '../utils/contant';

const activeKey = ref<string>('/user/login');

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, next) => {
  activeKey.value = to.path;
});
const navChange = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style>
#UserLayout .header {
  text-align: center;
  margin: 0 auto;
  margin-top: 8%;
}

#UserLayout .content {
  text-align: center;
  margin: 0 auto;
}

#UserLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
#UserLayout .title-bar {
  display: flex;
  align-items: center;
  margin-bottom: 30%;
}

#UserLayout .title-bar .title {
  color: #444;
  margin-left: 16px;
}

#UserLayout .title-bar .logo {
  height: 80px;
  width: 80px;
}
</style>
