import { accessEnum } from '@/access/accessEnum';
import HomeView from '@/views/HomeView.vue';
import NoAuthView from '@/views/NoAuthView.vue';
import DoQuestionView from '@/views/question/DoQuestionView.vue';
import QuestionAddView from '@/views/question/QuestionAddView.vue';
import QuestionListView from '@/views/question/QuestionListView.vue';
import QuestionManageView from '@/views/question/QuestionManageView.vue';
import QuestionUpdateView from '@/views/question/QuestionUpdateView.vue';
import SubmitQuestionListView from '@/views/question/SubmitQuestionListView.vue';
import UserLoginView from '@/views/user/UserLoginView.vue';
import UserRegisterView from '@/views/user/UserRegisterView.vue';
import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户layout',
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: '/user/login',
        name: '用户登录页面',
        component: UserLoginView,
      },
      {
        path: '/user/register',
        name: '用户注册页面',
        component: UserRegisterView,
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/question_list',
    name: '题库',
    component: QuestionListView,
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/question_submit_list',
    name: '题目提交记录',
    component: SubmitQuestionListView,
  },
  {
    path: '/admin',
    name: '管理员页面',
    meta: {
      access: accessEnum.ADMIN,
      hasSub: true,
    },
    children: [
      {
        path: '/admin/question_add',
        name: '添加题目',
        component: QuestionAddView,
      },
      {
        path: '/admin/question_manage',
        name: '题目管理',
        component: QuestionManageView,
      },
    ],
  },
  {
    path: '/admin/question_update/:id',
    name: '题目更新',
    component: QuestionUpdateView,
    meta: {
      hideInMenu: true,
      access: accessEnum.ADMIN,
    },
  },
  {
    path: '/question/:id',
    name: '做题页面',
    component: DoQuestionView,
    meta: {
      hideInMenu: true,
    },
  },
];
