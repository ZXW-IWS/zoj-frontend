<script setup lang="ts">
import breaks from '@bytemd/plugin-breaks';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/vue-next';
import { defineProps, withDefaults } from 'vue';

const plugins = [
  gfm(),
  highlight(),
  breaks(),
  // Add more plugins here
];
type Props = {
  value: string;
  handleChange: (v: string) => void;
};

const props = withDefaults(defineProps<Props>(), {
  value: '',
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<!--//v-deep使得样式能传递到子组件-->
<style scoped>
::v-deep .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
