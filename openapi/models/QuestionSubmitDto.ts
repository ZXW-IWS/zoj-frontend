/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from './JudgeInfo';
import type { QuestionDto } from './QuestionDto';
import type { UserDto } from './UserDto';
export type QuestionSubmitDto = {
    id?: number;
    language?: string;
    code?: string;
    status?: number;
    judgeInfo?: JudgeInfo;
    createTime?: string;
    questionInfo?: QuestionDto;
    userInfo?: UserDto;
};

