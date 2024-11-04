<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from 'vue';

type Props = {
  value: string;
  handleChange: (v: string) => void;
  language: string;
};

const props = withDefaults(defineProps<Props>(), {
  value: '',
  handleChange: (v: string) => {
    console.log(v);
  },
  language: 'java',
});

const editor = ref();
const initEditor = () => {
  // 初始化编辑器，确保dom已经渲染
  editor.value = monaco.editor.create(document.getElementById('codeEditBox'), {
    value: '', //编辑器初始显示文字
    language: 'java', //语言
    theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
    roundedSelection: false,
    readOnly: false, // 只读
    automaticLayout: true,
    cursorStyle: 'line', //光标样式
    glyphMargin: true, //字形边缘
    useTabStops: false,
    fontSize: 15, //字体大小
    autoIndent: false, //自动布局
    quickSuggestionsDelay: 100, //代码提示延时
  });
  // 监听值的变化
  editor.value.onDidChangeModelContent((val) => {
    props.handleChange(toRaw(editor.value).getValue());
  });
};

// 监测语言变化，更新 Monaco Editor
watch(
  () => props.language,
  (newLanguage) => {
    if (editor.value) {
      monaco.editor.setModelLanguage(
        toRaw(editor.value).getModel(),
        newLanguage,
      );
      console.log('codeLanguage:', editor.value.getModel().getLanguageId());
    }
  },
);

onMounted(() => {
  initEditor();
});
</script>

<template>
  <div id="codeEditBox"></div>
</template>

<style scoped>
#codeEditBox {
  width: 100%;
  min-height: 400px;
  height: 85vh;
}
</style>
