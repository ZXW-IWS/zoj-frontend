<template>
  <div class="about">
    <CodeEditor :value="value" :handle-change="handleChange" />
    <h1>This is an about page</h1>
  </div>
</template>
<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { ref } from 'vue';

const value = ref('');
const handleChange = (v: string) => {
  value.value = v;
  console.log('输入：', value.value);
};
</script>
