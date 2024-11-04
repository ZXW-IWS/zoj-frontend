<template>
  <div id="navHeader">
    <a-row style="margin-bottom: 16px" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/oj-logo.svg" alt="" />
              <div class="title">ZOJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRouter" :key="item.path">
            <!--todo:禁止点击sub-menu-->
            <a-sub-menu v-if="item.meta?.hasSub" :disabled="true">
              <template #title>{{ item.name }}</template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                {{ subItem.name }}
              </a-menu-item>
            </a-sub-menu>
            <div v-else>{{ item.name }}</div>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          <a-avatar>
            <img
              alt="avatar"
              :src="
                store.state.user.loginUser?.avatarUrl ??
                'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9123.png~tplv-uwbnlip3yd-webp.webp'
              "
            />
          </a-avatar>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { checkAccess } from '@/access/checkAccess';
import { routes } from '@/router/routes';
import store from '@/store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref(['/']);
// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  console.log('path=' + key);
  router.push({
    path: key,
  });
};
const visibleRouter = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) return false;
    if (!checkAccess(store.state.user?.loginUser, item.meta?.access as number))
      return false;

    return true;
  });
});
</script>

<style scoped>
#navHeader {
  box-sizing: border-box;
  width: 100%;
}

#navHeader .title-bar {
  display: flex;
  align-items: center;
}

#navHeader .title-bar .title {
  color: #444;
  margin-left: 16px;
}

#navHeader .title-bar .logo {
  height: 48px;
  width: 48px;
}
</style>
