<template>
  <div id="questionListView">
    <a-form layout="inline" @submit="conditionalSearch" style="max-width: 100%">
      <a-form-item label="题目标题">
        <a-input v-model="searchParams.title" placeholder="请输入题目标题" />
      </a-form-item>
      <a-form-item label="题目难度">
        <a-select v-model="searchParams.difficult">
          <a-option :value="0">简单</a-option>
          <a-option :value="1">中等</a-option>
          <a-option :value="2">困难</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="题目标签">
        <a-select
          v-model="searchParams.tagList"
          placeholder="请选择题目标签"
          multiple
        >
          <a-option v-for="item in tagNameList" :key="item" :value="item"
            >{{ item }}
          </a-option>
          <a-option :value="0">简单</a-option>
          <a-option :value="1">中等</a-option>
          <a-option :value="2">困难</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" size="large">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="data"
      :table-layout-fixed="true"
      :pagination="{
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        showTotal: true,
        total: totalQuestion,
      }"
      @page-change="pageChange"
    >
      <template #title="{ record }">
        <a :href="`/question/${record.id}`">{{ record.title }}</a>
      </template>
      <template #difficult="{ record }">
        {{ DIFFICULT_ARR[record.difficult] }}
      </template>
      <template #tagList="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tagList"
            :key="index"
            color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #successRate="{ record }">
        {{
          `${
            record.submitCount ? record.acceptCount / record.submitNum : '0'
          }% (${record.acceptCount}/${record.submitCount})`
        }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QuestionDto, QuestionPageReq, Service } from '../../../openapi';
import { DIFFICULT_ARR } from '../../utils/contant';

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '题目',
    slotName: 'title',
  },
  {
    title: '难度',
    slotName: 'difficult',
  },
  {
    title: '标签',
    slotName: 'tagList',
  },
  {
    title: '通过率',
    slotName: 'successRate',
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

const conditionalSearch = async () => {
  searchParams.value.current = 1;
  await loadData();
};
</script>

<style>
#questionListView {
  max-width: 80%;
  margin: 0 auto;
}
</style>
