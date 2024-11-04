/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';
export type QuestionAddReq = {
    title?: string;
    description?: string;
    tagList?: Array<string>;
    difficult?: number;
    answer?: string;
    judgeConfig?: JudgeConfig;
    judgeCase?: Array<JudgeCase>;
};

