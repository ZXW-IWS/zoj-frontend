<template>
  <div id="app" v-if="route.path.startsWith('/user')">
    <UserLayout />
  </div>
  <div v-else>
    <BasicLayout />
  </div>
</template>

<style></style>
<script setup lang="ts">
import BasicLayout from '@/layout/BasicLayout.vue';
import UserLayout from '@/layout/UserLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
