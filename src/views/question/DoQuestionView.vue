<template>
  <div class="doQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目">
            <a-card style="text-color">
              <template #title
                ><h1>
                  {{ questionInfo.id }}.{{ questionInfo.title }}
                </h1></template
              >
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of questionInfo.tagList"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
              <div>
                时间限制:{{ questionInfo.judgeConfig?.timeLimit ?? 0 }} ms
                <br />
                空间限制:{{ questionInfo.judgeConfig?.memoryLimit ?? 0 }} KB
              </div>
            </a-card>
            <MdRead :value="questionInfo.description" />
          </a-tab-pane>
          <!--          todo:评论区功能待开发-->
          <a-tab-pane key="2" title="评论区">
            Content of Tab Panel 2
          </a-tab-pane>
          <!--          todo:显示题解-->
          <a-tab-pane key="3" title="题解"> Content of Tab Panel 3</a-tab-pane>
        </a-tabs>
      </a-col>
      <!--右侧-->
      <a-col :md="12" :xs="24">
        <a-form layout="inline" style="max-width: 100%">
          <a-form-item label="语言">
            <a-select v-model="language">
              <a-option value="java">java</a-option>
              <a-option value="cpp">c++</a-option>
              <a-option value="python">python</a-option>
              <a-option value="c">c</a-option>
              <a-option value="html">html</a-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              type="primary"
              size="large"
              @click="doSubmit"
            >
              提交代码
            </a-button>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="code"
          :language="language"
          :handle-change="codeChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import MdRead from '@/components/MdRead.vue';
import router from '@/router';
import { respSuccess } from '@/utils/respMessageNotice';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { QuestionDto, Service } from '../../../openapi';

const route = useRoute();
const questionInfo = reactive<QuestionDto>({});
onMounted(async () => {
  const questionId: number = parseInt(route.params.id as string);
  if (!questionId) return;
  const res = await Service.getById(questionId);
  if (res.code === 0) {
    Object.assign(questionInfo, res.data);
  }
});

const language = ref<string>('java');
const code = ref<string>('');
const codeChange = (v: string) => {
  code.value = v;
};

const doSubmit = async () => {
  const res = await Service.submitQuestion({
    language: language.value,
    code: code.value,
    questionId: questionInfo.id,
  });
  if (res.code === 0) {
    respSuccess('提交成功');
    router.push({
      path: '/question_submit_list',
    });
  }
};
</script>

<style>
#doQuestionView {
  margin-bottom: 0;
}
</style>
