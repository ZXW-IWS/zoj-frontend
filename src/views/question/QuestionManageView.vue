<template>
  <div class="questionAdminView">
    <a-table
      :columns="columns"
      :data="data"
      :pagination="{
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        showTotal: true,
        total: totalQuestion,
      }"
      @page-change="pageChange"
    >
      <template #optional="{ record }">
        <a-button status="success" @click="goUpdateQuestion(record)"
          >修改
        </a-button>
        <a-popconfirm
          content="您确定要删除吗？"
          type="warning"
          @ok="deleteQuestion(record)"
        >
          <a-button status="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { respSuccess } from '@/utils/respMessageNotice';
import { onMounted, ref } from 'vue';
import { QuestionDto, QuestionPageReq, Service } from '../../../openapi';

const columns = [
  {
    title: '题目id',
    dataIndex: 'id',
  },
  {
    title: '题目标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'description',
  },
  {
    title: '题目难度',
    dataIndex: 'difficult',
  },
  {
    title: '题目标签',
    dataIndex: 'tagList',
  },
  {
    title: '判题配置',
    children: [
      {
        title: '时间限制(ms)',
        dataIndex: 'judgeConfig.timeLimit',
      },
      {
        title: '空间限制(KB)',
        dataIndex: 'judgeConfig.memoryLimit',
      },
    ],
  },
  {
    title: '提交数',
    dataIndex: 'submitCount',
  },
  {
    title: '通过数',
    dataIndex: 'acceptCount',
  },
  {
    title: '创建用户',
    dataIndex: 'createUser.username',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    slotName: 'optional',
  },
];
const data = ref<Array<QuestionDto>>([]);
const searchParams = ref<QuestionPageReq>({
  current: 1,
  pageSize: 10,
});
const totalQuestion = ref<number>(0);
const loadData = async () => {
  console.log('params' + searchParams.value);
  const res = await Service.getByPage(searchParams.value);
  if (res.code === 0) {
    data.value = res.data?.records ?? [];
    totalQuestion.value = res.data?.total ?? 0;
    //删除时用：若删除后查询本页数据为空后查询前一页
    if (
      data.value.length === 0 &&
      searchParams.value?.current &&
      searchParams.value?.current > 1
    ) {
      searchParams.value.current = searchParams.value.current - 1;
      await loadData();
    }
  }
};
onMounted(() => {
  loadData();
});

const deleteQuestion = async (record: QuestionDto) => {
  const res = await Service.deleteQuestion({ questionId: record.id });
  if (res.code === 0) {
    respSuccess('删除成功');
    loadData();
  }
};

const goUpdateQuestion = (record: QuestionDto) => {
  router.push({
    path: `/admin/question_update/${record.id}`,
  });
};

const pageChange = async (page: number) => {
  searchParams.value.current = page;
  await loadData();
};
</script>

<style>
#questionAdminView {
}
</style>
