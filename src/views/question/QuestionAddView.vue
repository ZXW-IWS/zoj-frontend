<template>
  <div class="questionAddView">
    <h1 style="text-align: center">创建题目</h1>
    <a-form
      ref="formRef"
      :rules="rules"
      :size="formSize"
      :model="form"
      @submit-success="submit"
    >
      <!--表单尺寸-->
      <a-form-item field="size" label="大小">
        <a-radio-group v-model="formSize" type="button">
          <a-radio value="mini">灰常小</a-radio>
          <a-radio value="small">小</a-radio>
          <a-radio value="medium">正常</a-radio>
          <a-radio value="large">大</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        field="title"
        label="题目标题"
        :validate-trigger="['change', 'input']"
      >
        <a-input v-model="form.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item field="description" label="题目内容">
        <MdEditor
          :value="form.description"
          :handle-change="descChange"
          style="width: 1000px"
        />
      </a-form-item>
      <a-form-item field="answer" label="题目答案">
        <MdEditor
          :value="form.answer"
          :handle-change="answerChange"
          style="width: 1000px"
        />
      </a-form-item>
      <a-form-item field="difficult" label="题目难度">
        <a-select v-model="form.difficult" placeholder="Please select ...">
          <a-option :value="0">简单</a-option>
          <a-option :value="1">中等</a-option>
          <a-option :value="2">困难</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="tagList" label="题目标签">
        <a-select v-model="form.tagList" placeholder="请选择题目标签" multiple>
          <a-option v-for="item in tagNameList" :key="item" :value="item"
            >{{ item }}
          </a-option>
        </a-select>
      </a-form-item>

      <a-form-item label="判题配置">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item
              :style="{ width: '350px' }"
              field="judgeConfig.timeLimit"
              label="时间限制"
            >
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                model-event="input"
                placeholder="请输入时间限制"
                :min="0"
                :max="1000"
              >
                <template #suffix> ms</template>
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :style="{ width: '350px' }"
              field="judgeConfig.memoryLimit"
              label="空间限制"
            >
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                model-event="input"
                placeholder="请输入空间限制"
                :min="0"
                :max="1000"
              >
                <template #suffix> KB</template>
              </a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item label="判题用例" :content-flex="false" :merge-props="false">
        <a-button @click="handleAdd">添加用例</a-button>
        <a-form-item
          v-for="(judgeCaseItem, index) in form.judgeCase"
          :field="`form.judgeCase[${index}].value`"
          :label="`用例-${index + 1}`"
          :key="index"
        >
          <a-input v-model="judgeCaseItem.input" placeholder="输入用例" />
          <a-input v-model="judgeCaseItem.output" placeholder="输出用例" />
          <a-button @click="handleDelete(index)" :style="{ marginLeft: '10px' }"
            >删除用例
          </a-button>
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button html-type="submit">提交</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    {{ form }}
  </div>
</template>

<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue';
import { respFalse, respSuccess } from '@/utils/respMessageNotice';
import { onMounted, reactive, ref } from 'vue';
import { QuestionAddReq, Service } from '../../../openapi';

const tagNameList = ref<Array<string>>([]);
onMounted(async () => {
  const res = await Service.getTagNameList();
  if (res.code === 0) {
    tagNameList.value = res.data ?? [];
  }
});
const formSize = ref('medium');
const form = reactive<QuestionAddReq>({
  title: '',
  description: '',
  tagList: [],
  difficult: 0,
  answer: '',
  judgeConfig: {
    timeLimit: 10,
    memoryLimit: 10,
  },
  judgeCase: [
    {
      input: '123',
      output: '444',
    },
  ],
});

const rules = {
  title: [
    {
      required: true,
      message: '题目标题不能为空',
    },
  ],
  description: [
    {
      required: true,
      message: '题目内容不能为空',
    },
  ],
  answer: [
    {
      required: true,
      message: '题目答案不能为空',
    },
  ],
};

const descChange = (v: string) => {
  form.description = v;
};
const answerChange = (v: string) => {
  form.answer = v;
};

const handleDelete = (index: number) => {
  form.judgeCase?.splice(index, 1);
};
const handleAdd = () => {
  form.judgeCase?.push({
    input: '',
    output: '',
  });
};

const submit = async () => {
  console.log(form);
  const res = await Service.addQuestion(form);
  if (res.code === 0) {
    respSuccess('添加成功');
  } else {
    respFalse(res.message ?? '', res.description ?? '');
  }
};
</script>

<style>
#questionAddView {
}
</style>
