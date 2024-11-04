/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from './JudgeConfig';
import type { UserDto } from './UserDto';
export type QuestionDto = {
    id?: number;
    title?: string;
    description?: string;
    submitCount?: number;
    tagList?: Array<string>;
    acceptCount?: number;
    difficult?: number;
    judgeConfig?: JudgeConfig;
    createTime?: string;
    updateTime?: string;
    createUser?: UserDto;
};

