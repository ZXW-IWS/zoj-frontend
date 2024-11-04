<template>
  <div id="submitQuestionListView">
    <a-table
      :columns="columns"
      :data="data.records"
      :table-layout-fixed="true"
      :pagination="{
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        showTotal: true,
        total: totalQuestion,
      }"
      @page-change="pageChange"
    >
      <template #question="{ record }">
        {{ record.questionInfo.title }}
      </template>
      <template #userSlot="{ record }">
        {{ record.userInfo.username }}
      </template>
      <template #status="{ record }">
        {{ JUDGE_QUESTION_STATUS_ARR[record.status] }}
      </template>
      <template #time="{ record }">
        {{ formatTime(record.judgeInfo.time) }}</template
      >
      <template #memory="{ record }">
        {{ formatMemorySize(record.judgeInfo.memory) }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import {
  QuestionSubmitPageReq,
  Service,
  type QuestionSubmitDto,
} from '../../../openapi';
import {
  formatMemorySize,
  formatTime,
  JUDGE_QUESTION_STATUS_ARR,
} from '../../utils/contant';

const columns = [
  {
    title: '运行id',
    dataIndex: 'id',
  },
  {
    title: '题目',
    slotName: 'question',
  },
  {
    title: '用户',
    slotName: 'userSlot',
  },
  {
    title: '判题状态',
    slotName: 'status',
  },
  {
    title: '判题结果',
    dataIndex: 'judgeInfo.message',
  },
  {
    title: '消耗时间',
    slotName: 'time',
  },
  {
    title: '消耗空间',
    dataIndex: 'judgeInfo.memory',
    slotName: 'memory',
  },
  {
    title: '编程语言',
    dataIndex: 'language',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
  },
];
const data = reactive<{ records: Array<QuestionSubmitDto> }>({ records: [] });
const searchParams = ref<QuestionSubmitPageReq>({
  current: 1,
  pageSize: 10,
});
const totalQuestion = ref<number>(0);
const loadData = async () => {
  console.log('params' + searchParams.value);
  const res = await Service.getPage(searchParams.value);
  if (res.code === 0) {
    data.records = res.data?.records ?? [];
    totalQuestion.value = res.data?.total ?? 0;
    //删除时用：若删除后查询本页数据为空后查询前一页
    if (
      data.records.length === 0 &&
      searchParams.value?.current &&
      searchParams.value?.current > 1
    ) {
      searchParams.value.current = searchParams.value.current - 1;
      await loadData();
    }
  }
};
const tagNameList = ref<Array<string>>([]);
onMounted(async () => {
  const res = await Service.getTagNameList();
  if (res.code === 0) {
    tagNameList.value = res.data ?? [];
  }
  loadData();
});

const pageChange = async (page: number) => {
  searchParams.value.current = page;
  await loadData();
};
</script>

<style>
#submitQuestionListView {
  max-width: 80%;
  margin: 0 auto;
}
</style>
