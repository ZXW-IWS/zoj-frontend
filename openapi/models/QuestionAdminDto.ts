/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionAdminDto = {
    id?: number;
    userId?: number;
    title?: string;
    description?: string;
    submitCount?: number;
    acceptCount?: number;
    difficult?: number;
    tagList?: Array<string>;
    answer?: string;
    judgeConfig?: JudgeConfig;
    judgeCase?: Array<JudgeCase>;
    createTime?: string;
    updateTime?: string;
};

